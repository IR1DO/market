import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
// } from '@/components/ui/pagination';
// import { Progress } from '@/components/ui/progress';
// import { Separator } from '@/components/ui/separator';
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  BadgeDollarSign,
  Copy,
  CreditCard,
  File,
  Home,
  LayoutDashboard,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import React from 'react';
import prisma from '@/prisma/db';
import { Separator } from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import { Decimal } from '@prisma/client/runtime/library';
import DashProductSalesTable from '@/components/dash-product-sales-table';
import { Progress } from '@/components/ui/progress';
import DashProductsTable from '@/components/dash-products-table';
import DashSalesTable from '@/components/dash-sales-table';

export interface SearchParams {
  sort: string;
}

interface Sale {
  id: number;
  sale_amount: Decimal;
  sale_date: Date;
  products: {
    sale_id: number;
    product_id: number;
    product_name: string;
    product_price: Decimal;
    sale_quantity: number;
    created_at: Date;
    updated_at: Date;
  }[];
}

interface ProductSale {
  product_id: number;
  product_name: string;
  product_price: Decimal;
  sale_quantity: number;
}

export interface ProductSalesAndAmounts {
  id: number;
  name: string;
  quantity: number;
  amount: number;
}

const Dashboard = async ({ searchParams }: { searchParams: SearchParams }) => {
  const products = await prisma.product.findMany({ take: 10 });

  const currentDate = new Date();

  const thisMonthRange = {
    startDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
    endDate: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0),
  };

  const lastMonthRange = {
    startDate: new Date(
      currentDate.getMonth() === 0
        ? currentDate.getFullYear() - 1
        : currentDate.getFullYear(),
      currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1,
      1
    ),
    endDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), 0),
  };

  const thisYearRange = {
    startDate: new Date(
      currentDate.getFullYear() - 1,
      currentDate.getMonth() + 1,
      1
    ),
    endDate: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0),
  };

  const lastYearRange = {
    startDate: new Date(currentDate.getFullYear() - 1, 0, 1),
    endDate: new Date(currentDate.getFullYear() - 1, 11, 31),
  };

  const thisMonthSales = await prisma.sale.findMany({
    where: {
      sale_date: {
        gte: thisMonthRange.startDate,
        lte: thisMonthRange.endDate,
      },
    },
    include: {
      products: true,
    },
  });

  const lastMonthSales = await prisma.sale.findMany({
    where: {
      sale_date: {
        gte: lastMonthRange.startDate,
        lte: lastMonthRange.endDate,
      },
    },
    include: {
      products: true,
    },
  });

  const thisYearSales = await prisma.sale.findMany({
    where: {
      sale_date: {
        gte: thisYearRange.startDate,
        lte: thisYearRange.endDate,
      },
    },
    include: {
      products: true,
    },
  });

  const lastYearSales = await prisma.sale.findMany({
    where: {
      sale_date: {
        gte: lastYearRange.startDate,
        lte: lastYearRange.endDate,
      },
    },
    include: {
      products: true,
    },
  });

  const allSales = await prisma.sale.findMany({
    include: {
      products: true,
    },
  });

  function getProductSalesAndAmounts(sales: Sale[]): ProductSalesAndAmounts[] {
    const productSalesAndAmounts: {
      [key: number]: { name: string; quantity: number; amount: number };
    } = {};

    sales.forEach((sale: Sale) => {
      sale.products.forEach((product: ProductSale) => {
        const { product_id, product_name, product_price, sale_quantity } =
          product;
        const sale_amount =
          parseFloat(product_price.toString()) * sale_quantity;

        if (productSalesAndAmounts[product_id]) {
          productSalesAndAmounts[product_id].quantity += sale_quantity;
          productSalesAndAmounts[product_id].amount += sale_amount;
        } else {
          productSalesAndAmounts[product_id] = {
            name: product_name,
            quantity: sale_quantity,
            amount: sale_amount,
          };
        }
      });
    });

    const result: ProductSalesAndAmounts[] = [];
    Object.keys(productSalesAndAmounts).forEach((productId) => {
      const id = parseInt(productId);
      const { name, quantity, amount } = productSalesAndAmounts[id];
      result.push({ id, name, quantity, amount });
    });

    return result;
  }

  function calculateTotalAmount(
    productSalesAndAmounts: ProductSalesAndAmounts[]
  ): number {
    return productSalesAndAmounts.reduce(
      (total, product) => total + product.amount,
      0
    );
  }

  const thisMonthProductSalesAndAmounts =
    getProductSalesAndAmounts(thisMonthSales);
  const lastMonthProductSalesAndAmounts =
    getProductSalesAndAmounts(lastMonthSales);
  const thisYearProductSalesAndAmounts =
    getProductSalesAndAmounts(thisYearSales);
  const lastYearProductSalesAndAmounts =
    getProductSalesAndAmounts(lastYearSales);
  const allProductSalesAndAmounts = getProductSalesAndAmounts(allSales);

  // calculate growth rate
  const allSalesAmount = calculateTotalAmount(allProductSalesAndAmounts);
  const thisMonthSalesAmount = calculateTotalAmount(
    thisMonthProductSalesAndAmounts
  );
  const lastMonthSalesAmount = calculateTotalAmount(
    lastMonthProductSalesAndAmounts
  );
  const thisYearSalesAmount = calculateTotalAmount(
    thisYearProductSalesAndAmounts
  );
  const lastYearSalesAmount = calculateTotalAmount(
    lastYearProductSalesAndAmounts
  );
  const monthlyGrowthAmount = thisMonthSalesAmount - lastMonthSalesAmount;
  const monthlyGrowthRate =
    (monthlyGrowthAmount / (lastMonthSalesAmount || thisMonthSalesAmount)) *
    100;
  const formattedMonthlyGrowthRate =
    monthlyGrowthRate < 0
      ? '-' + Math.abs(Math.floor(monthlyGrowthRate))
      : '+' + Math.abs(Math.floor(monthlyGrowthRate));
  const annualGrowthAmount = thisYearSalesAmount - lastYearSalesAmount;
  const annualGrowthRate =
    (annualGrowthAmount / (lastYearSalesAmount || thisYearSalesAmount)) * 100;
  const formattedAnnualGrowthRate =
    annualGrowthRate < 0
      ? '-' + Math.abs(Math.floor(annualGrowthRate))
      : '+' + Math.abs(Math.floor(annualGrowthRate));

  return (
    <div className='mb-6'>
      <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
        <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
          <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4'>
            <Card className='sm:col-span-2' x-chunk='dashboard-chunk-0'>
              <CardHeader className='pb-3'>
                <CardTitle>Supermarket Management System</CardTitle>
                <CardDescription className='max-w-lg text-balance leading-relaxed'>
                  Introducing Our Dynamic Market System for Seamless Management
                  and Insightful Analysis.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button>
                  <Link href='/sales/new'>Create New Sale</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card x-chunk='dashboard-chunk-1'>
              <CardHeader className='pb-2'>
                <CardDescription>This Month</CardDescription>
                <CardTitle className='text-4xl'>{`¥${calculateTotalAmount(
                  thisMonthProductSalesAndAmounts
                ).toLocaleString('en-US')}`}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={'text-xs text-muted-foregroun'}>
                  <span
                    className={`${
                      formattedMonthlyGrowthRate.startsWith('-')
                        ? 'text-red-500'
                        : 'text-green-500'
                    }`}
                  >{`${formattedMonthlyGrowthRate}% `}</span>
                  from last month
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={parseInt(formattedMonthlyGrowthRate)} />
              </CardFooter>
            </Card>

            <Card x-chunk='dashboard-chunk-2'>
              <CardHeader className='pb-2'>
                <CardDescription>This Year</CardDescription>
                <CardTitle className='text-4xl'>{`¥${calculateTotalAmount(
                  thisYearProductSalesAndAmounts
                ).toLocaleString('en-US')}`}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-xs text-muted-foreground'>
                  <span
                    className={`${
                      formattedAnnualGrowthRate.startsWith('-')
                        ? 'text-red-500'
                        : 'text-green-500'
                    }`}
                  >{`${formattedAnnualGrowthRate}% `}</span>
                  from last year
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={parseInt(formattedAnnualGrowthRate)} />
              </CardFooter>
            </Card>
          </div>

          <Tabs defaultValue='products'>
            <div className='flex items-center'>
              <TabsList>
                <TabsTrigger value='products'>Products</TabsTrigger>
                <TabsTrigger value='sales'>Sales</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value='products'>
              <Tabs defaultValue='month'>
                <div className='flex items-center'>
                  <TabsList>
                    <TabsTrigger value='month'>Month</TabsTrigger>
                    <TabsTrigger value='year'>Year</TabsTrigger>
                    <TabsTrigger value='all'>All</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value='month'>
                  <Card x-chunk='dashboard-chunk-3'>
                    <CardHeader className='px-7'>
                      <CardTitle>Sales Records for Products</CardTitle>
                      <CardDescription>
                        Recent month sales Records for Products.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DashProductSalesTable
                        products={thisMonthProductSalesAndAmounts}
                        searchParams={searchParams}
                      />
                    </CardContent>
                    <CardFooter>
                      <div className='text-lg font-semibold'>
                        <span>Total Amount:</span>
                        <span className='text-orange-600'>{` ¥${thisMonthSalesAmount.toLocaleString(
                          'en-US'
                        )}`}</span>
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value='year'>
                  <Card x-chunk='dashboard-chunk-3'>
                    <CardHeader className='px-7'>
                      <CardTitle>Sales Records for Products</CardTitle>
                      <CardDescription>
                        Recent year sales Records for Products.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DashProductSalesTable
                        products={thisYearProductSalesAndAmounts}
                        searchParams={searchParams}
                      />
                    </CardContent>
                    <CardFooter>
                      <div className='text-lg font-semibold'>
                        <span>Total Amount:</span>
                        <span className='text-orange-600'>{` ¥${thisYearSalesAmount.toLocaleString(
                          'en-US'
                        )}`}</span>
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value='all'>
                  <Card x-chunk='dashboard-chunk-3'>
                    <CardHeader className='px-7'>
                      <CardTitle>Sales Records for Products</CardTitle>
                      <CardDescription>
                        Recent all sales Records for Products.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DashProductSalesTable
                        products={allProductSalesAndAmounts}
                        searchParams={searchParams}
                      />
                    </CardContent>
                    <CardFooter>
                      <div className='text-lg font-semibold'>
                        <span>Total Amount:</span>
                        <span className='text-orange-600'>{` ¥${allSalesAmount.toLocaleString(
                          'en-US'
                        )}`}</span>
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value='sales'>
              <Tabs defaultValue='month'>
                <div className='flex items-center'>
                  <TabsList>
                    <TabsTrigger value='month'>Month</TabsTrigger>
                    <TabsTrigger value='year'>Year</TabsTrigger>
                    <TabsTrigger value='all'>All</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value='month'>
                  <Card x-chunk='dashboard-chunk-3'>
                    <CardHeader className='px-7'>
                      <CardTitle>Sales Records</CardTitle>
                      <CardDescription>
                        Recent month sales Records.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DashSalesTable
                        sales={thisMonthSales}
                        searchParams={searchParams}
                      />
                    </CardContent>
                    <CardFooter>
                      <div className='text-lg font-semibold'>
                        <span>Total Amount:</span>
                        <span className='text-orange-600'>{` ¥${thisMonthSalesAmount.toLocaleString(
                          'en-US'
                        )}`}</span>
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value='year'>
                  <Card x-chunk='dashboard-chunk-3'>
                    <CardHeader className='px-7'>
                      <CardTitle>Sales Records</CardTitle>
                      <CardDescription>
                        Recent year sales Records.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DashSalesTable
                        sales={thisYearSales}
                        searchParams={searchParams}
                      />
                    </CardContent>
                    <CardFooter>
                      <div className='text-lg font-semibold'>
                        <span>Total Amount:</span>
                        <span className='text-orange-600'>{` ¥${thisYearSalesAmount.toLocaleString(
                          'en-US'
                        )}`}</span>
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value='all'>
                  <Card x-chunk='dashboard-chunk-3'>
                    <CardHeader className='px-7'>
                      <CardTitle>Sales Records</CardTitle>
                      <CardDescription>
                        Recent all sales Records.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DashSalesTable
                        sales={allSales}
                        searchParams={searchParams}
                      />
                    </CardContent>
                    <CardFooter>
                      <div className='text-lg font-semibold'>
                        <span>Total Amount:</span>
                        <span className='text-orange-600'>{` ¥${allSalesAmount.toLocaleString(
                          'en-US'
                        )}`}</span>
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>
        </div>

        <div className=''>
          <Card className='overflow-hidden' x-chunk='dashboard-chunk-4'>
            <CardHeader className='flex flex-row items-start bg-muted/50'>
              <div className='grid gap-0.5'>
                <CardTitle className='group flex items-center gap-2 text-lg'>
                  Products
                </CardTitle>
                <CardDescription>Part of products list</CardDescription>
              </div>

              <div className='ml-auto flex items-center gap-1'>
                <Button size='sm' variant='outline' className='h-8 gap-1'>
                  <Truck className='h-3.5 w-3.5 mr-1' />

                  <Link href='products/new'>Add New Product</Link>
                </Button>
              </div>
            </CardHeader>

            <CardContent className='p-6 text-sm'>
              <DashProductsTable products={products} />
            </CardContent>

            <CardFooter className='flex flex-row items-center border-t bg-muted/50 px-6 py-3'>
              <Button className='p-5'>
                <Link href='/products'>See all products</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
