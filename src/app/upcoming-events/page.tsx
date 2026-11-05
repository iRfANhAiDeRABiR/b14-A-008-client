"use client"

import * as React from "react"
import {
  Search,
  MapPin,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  RotateCcw,
  Sparkles,
  AlertCircle,
  RefreshCw,
  CalendarX,
  ChevronDown,
  Filter,
} from "lucide-react"
import { Event, EventPagination } from "@/types/event"
import { getEvents } from "@/lib/api"
import { EventCard } from "@/components/events/event-card"
import { EventGridSkeleton } from "@/components/shared/loading-skeleton"
import { EmptyState } from "@/components/shared/empty-state"
import { Container } from "@/components/shared/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "Cleanup", label: "Cleanup" },
  { value: "Plantation", label: "Plantation" },
  { value: "Donation", label: "Donation" },
  { value: "Education", label: "Education" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Other", label: "Other" },
]

const SORT_OPTIONS = [
  { value: "nearest", label: "Nearest First" },
  { value: "latest", label: "Latest Upcoming" },
]

export default function UpcomingEventsPage() {
  const [searchInput, setSearchInput] = React.useState("")
  const [search, setSearch] = React.useState("")
  const [locationInput, setLocationInput] = React.useState("")
  const [location, setLocation] = React.useState("")
  const [category, setCategory] = React.useState("all")
  const [sort, setSort] = React.useState<"nearest" | "latest">("nearest")
  const [page, setPage] = React.useState(1)
  const [reloadKey, setReloadKey] = React.useState(0)

  const [events, setEvents] = React.useState<Event[]>([])
  const [pagination, setPagination] = React.useState<EventPagination>({
    currentPage: 1,
    totalPages: 1,
    totalEvents: 0,
    limit: 9,
  })
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  const topGridRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchInput.trim())
      setPage(1)
    }, 400)
    return () => clearTimeout(handler)
  }, [searchInput])

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setLocation(locationInput.trim())
      setPage(1)
    }, 400)
    return () => clearTimeout(handler)
  }, [locationInput])

  React.useEffect(() => {
    let isMounted = true

    getEvents({
      search,
      eventType: category,
      location,
      sort,
      page,
      limit: 9,
    })
      .then((res) => {
        if (!isMounted) return
        setEvents(res.events)
        setPagination(res.pagination)
        setError(null)
        setLoading(false)
      })
      .catch((err) => {
        if (!isMounted) return
        setError(
          err instanceof Error
            ? err.message
            : "Unable to connect to the events server."
        )
        setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [search, category, location, sort, page, reloadKey])

  const handleClearSearch = () => {
    setLoading(true)
    setSearchInput("")
    setSearch("")
    setPage(1)
  }

  const handleClearLocation = () => {
    setLoading(true)
    setLocationInput("")
    setLocation("")
    setPage(1)
  }

  const handleClearAll = () => {
    setLoading(true)
    setSearchInput("")
    setSearch("")
    setLocationInput("")
    setLocation("")
    setCategory("all")
    setSort("nearest")
    setPage(1)
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoading(true)
    setCategory(e.target.value)
    setPage(1)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoading(true)
    setSort(e.target.value as "nearest" | "latest")
    setPage(1)
  }

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages || newPage === page) return
    setLoading(true)
    setPage(newPage)
    if (topGridRef.current) {
      const top = topGridRef.current.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  const handleRetry = () => {
    setLoading(true)
    setError(null)
    setReloadKey((prev) => prev + 1)
  }

  const hasActiveFilters =
    search.length > 0 ||
    category !== "all" ||
    location.length > 0 ||
    sort !== "nearest"

  return (
    <div className="min-h-screen bg-background py-10 sm:py-16">
      <Container className="space-y-10">
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5" />
            <span>Community Gatherings</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Explore Upcoming Events
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Find meaningful community activities, connect with volunteers and become part of positive change.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => {
                  setLoading(true)
                  setSearchInput(e.target.value)
                }}
                placeholder="Search events by title or location..."
                className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-10 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded-md"
                  aria-label="Clear search"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            <div className="relative">
              <Filter className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <select
                value={category}
                onChange={handleCategoryChange}
                className="h-11 w-full appearance-none rounded-xl border border-border bg-background pl-10 pr-10 text-sm text-foreground transition-colors hover:border-primary/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            </div>

            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={locationInput}
                onChange={(e) => {
                  setLoading(true)
                  setLocationInput(e.target.value)
                }}
                placeholder="Filter by city or area..."
                className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-10 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              {locationInput && (
                <button
                  type="button"
                  onClick={handleClearLocation}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded-md"
                  aria-label="Clear location filter"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            <div className="relative">
              <ArrowUpDown className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <select
                value={sort}
                onChange={handleSortChange}
                className="h-11 w-full appearance-none rounded-xl border border-border bg-background pl-10 pr-10 text-sm text-foreground transition-colors hover:border-primary/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/60 text-xs sm:text-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-foreground">
                {loading ? (
                  "Searching events..."
                ) : (
                  <>
                    Showing{" "}
                    <span className="font-bold text-primary">
                      {events.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-bold text-foreground">
                      {pagination.totalEvents}
                    </span>{" "}
                    {pagination.totalEvents === 1 ? "event" : "events"}
                  </>
                )}
              </span>

              {search && (
                <Badge
                  variant="secondary"
                  className="gap-1.5 pl-2.5 pr-1.5 py-1 text-xs font-normal"
                >
                  <span>Search: &ldquo;{search}&rdquo;</span>
                  <button
                    onClick={handleClearSearch}
                    className="hover:text-foreground transition-colors"
                    aria-label="Remove search filter"
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              )}

              {category !== "all" && (
                <Badge
                  variant="secondary"
                  className="gap-1.5 pl-2.5 pr-1.5 py-1 text-xs font-normal"
                >
                  <span>Category: {category}</span>
                  <button
                    onClick={() => {
                      setLoading(true)
                      setCategory("all")
                      setPage(1)
                    }}
                    className="hover:text-foreground transition-colors"
                    aria-label="Remove category filter"
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              )}

              {location && (
                <Badge
                  variant="secondary"
                  className="gap-1.5 pl-2.5 pr-1.5 py-1 text-xs font-normal"
                >
                  <span>Location: &ldquo;{location}&rdquo;</span>
                  <button
                    onClick={handleClearLocation}
                    className="hover:text-foreground transition-colors"
                    aria-label="Remove location filter"
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              )}
            </div>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground px-2.5"
              >
                <RotateCcw className="size-3.5" />
                <span>Clear All Filters</span>
              </Button>
            )}
          </div>
        </div>

        <div ref={topGridRef} className="scroll-mt-24">
          {loading ? (
            <EventGridSkeleton count={9} />
          ) : error ? (
            <div className="flex flex-col items-center justify-center p-8 sm:p-12 rounded-2xl border border-destructive/20 bg-destructive/5 text-center space-y-4 max-w-xl mx-auto">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
                <AlertCircle className="size-7" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  Unable to Load Events
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                  {error}
                </p>
              </div>
              <Button
                onClick={handleRetry}
                variant="outline"
                size="sm"
                className="gap-2 border-border"
              >
                <RefreshCw className="size-4" />
                <span>Retry</span>
              </Button>
            </div>
          ) : events.length === 0 ? (
            <EmptyState
              icon={CalendarX}
              title="No Events Found"
              description="We couldn't find any upcoming events matching your search. Try changing your filters or explore other community activities."
              actionLabel="Clear Filters"
              onAction={handleClearAll}
            />
          ) : (
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>

              {pagination.totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
                  <p className="text-xs sm:text-sm text-muted-foreground order-2 sm:order-1">
                    Page <span className="font-semibold text-foreground">{pagination.currentPage}</span> of{" "}
                    <span className="font-semibold text-foreground">{pagination.totalPages}</span>
                  </p>

                  <div className="flex items-center gap-1.5 order-1 sm:order-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={pagination.currentPage <= 1 || loading}
                      className="h-9 px-3 gap-1 rounded-lg border-border"
                    >
                      <ChevronLeft className="size-4" />
                      <span className="hidden sm:inline">Previous</span>
                    </Button>

                    <div className="flex items-center gap-1 px-1">
                      {Array.from({ length: pagination.totalPages }).map((_, index) => {
                        const pageNumber = index + 1
                        const isCurrent = pageNumber === pagination.currentPage
                        if (
                          pagination.totalPages > 6 &&
                          Math.abs(pageNumber - pagination.currentPage) > 2 &&
                          pageNumber !== 1 &&
                          pageNumber !== pagination.totalPages
                        ) {
                          if (
                            pageNumber === 2 ||
                            pageNumber === pagination.totalPages - 1
                          ) {
                            return (
                              <span
                                key={pageNumber}
                                className="px-1 text-xs text-muted-foreground"
                              >
                                &hellip;
                              </span>
                            )
                          }
                          return null
                        }

                        return (
                          <Button
                            key={pageNumber}
                            variant={isCurrent ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageChange(pageNumber)}
                            disabled={loading}
                            className={`size-9 p-0 rounded-lg text-xs font-semibold ${
                              isCurrent
                                ? "shadow-xs"
                                : "border-border text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {pageNumber}
                          </Button>
                        )
                      })}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={pagination.currentPage >= pagination.totalPages || loading}
                      className="h-9 px-3 gap-1 rounded-lg border-border"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight className="size-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

