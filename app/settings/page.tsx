import React from 'react';

const Settings = () => {
  return (
    <div className='flex flex-col items-center justify-center flex-auto p-8 bg-gray-100 dark:bg-background'>
      <div className='max-w-lg p-8 bg-white dark:bg-gray-900 shadow-md rounded-md'>
        <h1 className='text-3xl font-bold mb-4'>About This Project</h1>
        <p className='text-lg mb-4'>
          Welcome to my personal website! I am passionate about software
          development and enjoy building cool projects.
        </p>
        <p className='text-lg mb-4'>
          This website is created using Next.js and Tailwind CSS. Feel free to
          explore my projects and contributions.
        </p>
        <p className='text-lg mb-8'>
          For more information, visit my{' '}
          <a
            href='https://github.com/IR1DO'
            className='text-blue-600 hover:underline dark:text-blue-400'
          >
            GitHub repository
          </a>
          .
        </p>
        <div className='border-t border-gray-200 dark:border-gray-700 pt-4'>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            &copy; {new Date().getFullYear()} IR1DO(Kevin Hu). All rights
            reserved.
          </p>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Disclaimer: This website is for demonstration purposes only and does
            not represent any official organization.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
