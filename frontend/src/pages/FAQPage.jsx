import React, { useState } from 'react'
import Header from '../components/Layout/Header'
import styles from '../styles/style';

const Faq = () => {
  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tab) => {
    if (activeTab === tab) {
      setActiveTab(0);
    } else {
      setActiveTab(tab);
    }
  }

  return (
    <div className={`${styles.section}`}>
      <h2 className='text-3xl font-bold text-gray-900 mb-8'>FAQ</h2>
      <div className='mx-auto space-y-4'>
        {/* Single Faq */}
        <div className='border-b border-gray-200 pb-4'>
          <button className='flex items-center justify-between w-full' onClick={() => toggleTab(2)}>
            <span className='text-lg font-medium text-gray-900'>
              How do i track my order?
            </span>
            {activeTab === 2 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>

          {/* content tab */}
          {activeTab === 2 && (
            <div className='mt-4'>
              <p className='text-base text-gray-500'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Inventore eligendi quia molestias cum maxime voluptas,
                debitis a minima maiores nostrum animi enim corporis similique ipsa.
                Voluptatem, voluptate. Temporibus, reiciendis facere.
              </p>
            </div>
          )}
        </div>
        {/* Single Faq */}
        <div className='border-b border-gray-200 pb-4'>
          <button className='flex items-center justify-between w-full' onClick={() => toggleTab(3)}>
            <span className='text-lg font-medium text-gray-900'>
              How do i track my order?
            </span>
            {activeTab === 3 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>

          {/* content tab */}
          {activeTab === 3 && (
            <div className='mt-4'>
              <p className='text-base text-gray-500'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Inventore eligendi quia molestias cum maxime voluptas,
                debitis a minima maiores nostrum animi enim corporis similique ipsa.
                Voluptatem, voluptate. Temporibus, reiciendis facere.
              </p>
            </div>
          )}
        </div>
        {/* Single Faq */}
        <div className='border-b border-gray-200 pb-4'>
          <button className='flex items-center justify-between w-full' onClick={() => toggleTab(1)}>
            <span className='text-lg font-medium text-gray-900'>
              How do i track my order?
            </span>
            {activeTab === 1 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>

          {/* content tab */}
          {activeTab === 1 && (
            <div className='mt-4'>
              <p className='text-base text-gray-500'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Inventore eligendi quia molestias cum maxime voluptas,
                debitis a minima maiores nostrum animi enim corporis similique ipsa.
                Voluptatem, voluptate. Temporibus, reiciendis facere.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const FAQPage = () => {
  return (
    <div>
      <Header activeHeading={5} />
      <div className='mt-12'>
        <Faq />
      </div>
    </div>
  )
}

export default FAQPage