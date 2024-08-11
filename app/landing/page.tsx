'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { JobListing }from '../../types/index'
import JobCard from '../../components/JobCard'; 

const Home: React.FC = () => {
  const [jobPostings, setJobPostings] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobPostings = async () => {
      try {
        const response = await fetch('https://akil-backend.onrender.com/opportunities/search');
        // const jsonData = response.json()
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setJobPostings(data.data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchJobPostings();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen">Error: {error}</div>;

  return (
    <div className="w-[80%] pl-24 py-8 font-Epilogue">

      <div className="flex  justify-between ">
        <div className="pl-6">
          <h1 className="text-neutral-100 text-2xl font-black font-poppins">
            Opportunities
          </h1>
          <h2 className="font-normal font-epilogue text-base text-custom-gray">
            {/* Showing {jobPostings?.total_reviews} results */}
          </h2>
        </div>

        <div className="flex items-center gap-2 pr-8">
          <p className= "text-[#7C8493] cursor-pointer">
            Sort by:{" "}
            <span className="text-[#25324B] font-semibold">
              Most relevant{" "}
            </span>
          </p>
          <img className="w-4 h-4 cursor-pointer" src="/dropdown.png" alt="" /> 
          <p className = "text-[#7C8493]"> | </p>
        </div>
        </div>


        {jobPostings?.map((job) => (

          <Link key={job.id} href={`/jobs/${job.id}`} passHref className ="flex border-solid p-6  mb-7 gap-2">
                <JobCard job={job} />
          </Link>
        ))}
    
    </div>
   
  );
};

export default Home;
