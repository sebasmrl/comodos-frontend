'use client';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { useQueryParams } from "@/hooks/use-query-params";

interface Props {
    className?: string;
    currentPage: number;
    existAds: boolean;
}

export const PaginationAds = ({ className, currentPage, existAds }: Props) => {

    const queryParams = useQueryParams();
    delete queryParams['page'];
    
    const newUrl = Object.entries(queryParams).reduce( (prev,curr, )=>{
        return `${prev}&${curr[0]}=${curr[1]}`
    }, '');

    
    return (
        <Pagination className={cn('', className)}>
            <PaginationContent>

                <PaginationItem>
                    <PaginationPrevious href={(currentPage > 1 ? `?page=${currentPage-1}${newUrl}` : '/')} />
                </PaginationItem>
                {
                    Array.from({ length: 3 }, (_, index) => (currentPage>=2) ? index+currentPage-2 : index+currentPage-1)
                        .map((value) => (
                            <PaginationItem key={`page${value+1}`} >
                                <PaginationLink  href={`?page=${value+1}${newUrl}`} isActive={currentPage ==value+1 ? true: false } className={`${ (!existAds && (currentPage+2 ==value+2) || currentPage==value+1 || (currentPage==1 && value+1 ==3) )? 'pointer-events-none cursor-default text-gray-400' :''}`} >
                                    {value+1}
                                </PaginationLink>
                            </PaginationItem>))
                }

                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>

                <PaginationItem>
                    <PaginationNext href={`?page=${currentPage+1}${newUrl}`} className={`${ !existAds ? 'pointer-events-none cursor-default text-gray-400' :''}`} />
                </PaginationItem>
                
            </PaginationContent>
        </Pagination>
    )
}

