import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NextBreadcrumb = () => {
  // Gives us ability to load the current route details
  const router = usePathname();

  function generateBreadcrumbs() {
    // Remove any query parameters, as those aren't included in breadcrumbs
    const asPathWithoutQuery = router.split('?')[0];

    // Break down the path between "/"s, removing empty entities
    // Ex:"/my/nested/path" --> ["my", "nested", "path"]
    const asPathNestedRoutes = asPathWithoutQuery
      .split('/')
      .filter((v) => v.length > 0);

    // Iterate over the list of nested route parts and build
    // a "crumb" object for each one.
    const crumblist = asPathNestedRoutes.map((subpath, idx) => {
      // We can get the partial nested route for the crumb
      // by joining together the path parts up to this point.
      const id = idx + 1;
      const href = '/' + asPathNestedRoutes.slice(0, idx + 1).join('/');
      // The title will just be the route string for now
      const title = subpath.charAt(0).toUpperCase() + subpath.slice(1);
      return { id, href, title };
    });

    // Add in a default "Home" crumb for the top-level
    return [{ id: 1, href: '/', title: 'Dashboard' }, ...crumblist];
  }

  // Call the function to generate the breadcrumbs list
  const breadcrumbs = generateBreadcrumbs();

  return (
    <Breadcrumb className='hidden md:flex'>
      <BreadcrumbList>
        {breadcrumbs
          ? breadcrumbs.map((breadcrumb, index) => (
              <>
                <BreadcrumbItem key={breadcrumb.id}>
                  <BreadcrumbLink asChild>
                    {index !== breadcrumbs.length - 1 ? (
                      <BreadcrumbLink asChild>
                        <Link href={breadcrumb.href}>{breadcrumb.title}</Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
                    )}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </>
            ))
          : null}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default NextBreadcrumb;
