/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import type { JobResponse, JobSearchParams, PagedResponse } from "../types";
import { searchJobs } from "../api/requests";
import LoadingSpinner from "../components/LoadingSpinner";

const JobsPage = () => {
  const [jobs, setJobs] = useState<JobResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<JobSearchParams>({
    keyword: "",
    location: "",
    page: 0,
    size: 10,
  });
  const [pagination, setPagination] = useState({
    totalElements: 0,
    totalPages: 0,
    currentPage: 0,
    isLast: true,
  });

  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchLocation, setSearchLocation] = useState<string>("");

  const fetchJobs = async (params: JobSearchParams) => {
    try {
      setLoading(true);
      setError(null);

      const response = await searchJobs(params);
      const data: PagedResponse<JobResponse> = response;

      setJobs(data.content);
      setPagination({
        totalElements: data.totalElements,
        totalPages: data.totalPages,
        currentPage: data.page,
        isLast: data.last,
      });
    } catch (err: any) {
      console.error("Error fetching jobs:", err);
      setError(
        err?.response?.data?.message ||
          "Failed to fetch jobs. Please try again."
      );
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };
  // Initial load
  useEffect(() => {
    fetchJobs(searchParams);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = {
      ...searchParams,
      keyword: searchKeyword,
      location: searchLocation,
      page: 0,
    };
    setSearchParams(newParams);
    fetchJobs(newParams);
  };
  // Handle pagination
  const handlePageChange = (newPage: number) => {
    const newParams = { ...searchParams, page: newPage };
    setSearchParams(newParams);
    fetchJobs(newParams);
  };
  // Handle page size change
  const handlePageSizeChange = (newSize: number) => {
    const newParams = { ...searchParams, size: newSize, page: 0 };
    setSearchParams(newParams);
    fetchJobs(newParams);
  };
  // Clear search
  const handleClearSearch = () => {
    setSearchKeyword("");
    setSearchLocation("");
    const newParams = {
      keyword: "",
      location: "",
      page: 0,
      size: searchParams.size,
    };
    setSearchParams(newParams);
    fetchJobs(newParams);
  };

  // Format salary
  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return "Salary not specified";
    if (min && max)
      return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
    if (min) return `From $${min.toLocaleString()}`;
    if (max) return `Up to $${max.toLocaleString()}`;
    return "Salary not specified";
  };
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Find Your Next Job
        </h1>
        <p className="text-gray-600">
          Discover opportunities that match your skills and career goals
        </p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <form
          onSubmit={handleSearch}
          className="space-y-4 md:space-y-0 md:grid md:grid-cols-12 md:gap-4"
        >
          <div className="md:col-span-5">
            <label
              htmlFor="keyword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Job Title, Keywords, or Company
            </label>
            <input
              id="keyword"
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="e.g., Software Engineer, Marketing, Google..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <input
              id="location"
              type="text"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="e.g., New York, Remote, San Francisco..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-3 flex space-x-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium"
            >
              {loading ? "Searching..." : "Search Jobs"}
            </button>
            <button
              type="button"
              onClick={handleClearSearch}
              className="px-3 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              title="Clear search"
            >
              ✕
            </button>
          </div>
        </form>
      </div>
      {/* Results Summary */}
      {!loading && (
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-600">
              {pagination.totalElements > 0
                ? `Showing ${
                    pagination.currentPage * searchParams.size! + 1
                  }-${Math.min(
                    (pagination.currentPage + 1) * searchParams.size!,
                    pagination.totalElements
                  )} of ${pagination.totalElements} jobs`
                : "No jobs found"}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Jobs per page:</label>
            <select
              value={searchParams.size}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              {/* <option value={50}>50</option> */}
            </select>
          </div>
        </div>
      )}
      {/* Loading State */}
      {loading && <LoadingSpinner message="Searching for jobs..." />}
      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h3 className="text-red-800 font-medium mb-2">Error Loading Jobs</h3>
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => fetchJobs(searchParams)}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Jobs List */}
      {!loading && !error && jobs.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No Jobs Found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria or check back later for new
            opportunities.
          </p>
          <button
            onClick={handleClearSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            View All Jobs
          </button>
        </div>
      )}

      {/* Jobs Grid */}
      {!loading && !error && jobs.length > 0 && (
        <div className="space-y-4 mb-8">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                    {job.title}
                  </h3>
                  <div className="flex items-center text-gray-600 text-sm space-x-4 mb-3">
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {job.location}
                    </span>
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                        />
                      </svg>
                      {formatSalary(job.minSalary, job.maxSalary)}
                    </span>
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3a4 4 0 118 0v4M8 7v8a2 2 0 002 2h4a2 2 0 002-2V7M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2"
                        />
                      </svg>
                      Posted {formatDate(job.createdAt)}
                    </span>
                  </div>
                </div>
                <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
                  Apply Now
                </button>
              </div>

              <p className="text-gray-700 mb-4 line-clamp-3">
                {job.description}
              </p>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors">
                    Save Job
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                    View Details
                  </button>
                </div>
                <span className="text-xs text-gray-500">Job ID: {job.id}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 0}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <div className="flex items-center space-x-2">
            {[...Array(Math.min(5, pagination.totalPages))].map((_, index) => {
              let pageNum;
              if (pagination.totalPages <= 5) {
                pageNum = index;
              } else {
                const start = Math.max(0, pagination.currentPage - 2);
                pageNum = start + index;
                if (pageNum >= pagination.totalPages) {
                  pageNum = pagination.totalPages - 5 + index;
                }
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-10 h-10 rounded-md transition-colors ${
                    pagination.currentPage === pageNum
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {pageNum + 1}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.isLast}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default JobsPage;
