"use client";
import { useEffect, useState } from "react";
import {
  getSearch,
  GetSearchAxiosResponseT,
  HTTPValidationError,
} from "@/apis/search";
import { SearchInput } from "@/components/search-input";
import { Spinner } from "@/components/spinner";
import { isAxiosError } from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

type FiltersStateT = { search: string };

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FiltersStateT>({ search: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<GetSearchAxiosResponseT["data"]>({
    resultCount: 0,
    results: [],
  });

  const handleSearchApi = async (newFilters: Partial<FiltersStateT>) => {
    const vals = {
      ...filters,
      ...newFilters,
    };

    const queries = new URLSearchParams(vals).toString();
    router.replace(`?${queries}`);

    setIsLoading(true);
    try {
      const res = await getSearch({ term: vals.search, media: "podcast" });
      setData(res.data.data);
    } catch (error) {
      if (isAxiosError<HTTPValidationError>(error)) {
        console.error("Error fetching search results:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilters = (newFilters: Partial<FiltersStateT>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    handleSearchApi(newFilters);
  };

  useEffect(() => {
    const searchQuery = searchParams.get("search");

    if (typeof searchQuery === "string" && searchQuery.length > 0) {
      handleFilters({ search: searchQuery });
    }
  }, []);

  return (

    <div className="p-8 min-h-screen flex flex-col items-center">
      <div className="w-full container">
        <SearchInput
          value={filters.search}
          onChange={(search) => handleFilters({ search })}
          placeholder="Search for an artist..."
          disabled={isLoading}
        />

        {!filters.search && (
          <h1 className="text-2xl font-bold mb-6 text-center text-amber-900">
            Start Search to show the result
          </h1>
        )}

        {isLoading && <Spinner />}

        {!isLoading && data.results.length === 0 && !!filters.search && (
          <div className="flex flex-col items-center justify-center py-12">
            <svg
              className="h-12 w-12 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
              />
            </svg>
            <div className="text-xl font-semibold text-gray-700 mb-2">
              No results found
            </div>
            <div className="text-gray-500">Try a different search term.</div>
          </div>
        )}

        {!isLoading && data.results.length > 0 && (
          <ul className="grid grid-cols-12 gap-6">
            {data.results.map((item, i) => (
              <li
                key={i}
                className="bg-white col-span-12 sm:col-span-6 md:col-span-4 rounded-2xl border border-gray-200 shadow-lg p-6 flex flex-col items-center hover:shadow-2xl hover:scale-[1.02] transition-all duration-200 cursor-pointer"
                onClick={() => window.open(item.trackViewUrl, "_target")}
              >
                <Image
                  src={item.artworkUrl100}
                  alt={item.artistName}
                  width={100}
                  height={100}
                  className="rounded-xl object-cover w-24 h-24 mb-4"
                />
                <div className="w-full text-center">
                  <div className="font-semibold text-xl text-amber-800">
                    {item.artistName}
                  </div>
                  <div className="text-gray-600 text-base mt-1">
                    {item.collectionName}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
