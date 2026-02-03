import { render, screen } from "@testing-library/react";
import { describe, test, vi, expect } from "vitest";
import Movie from "./Movie";
import { MemoryRouter } from "react-router-dom";
import { MovieContext } from "../../context/MovieContext";
import axios from "axios";

// Mock axios
vi.mock("axios");

describe("Movie component test cases", () => {
    test("should render the movie component", async () => {
        // Setup mock return for axios
        axios.get.mockResolvedValue({ data: { results: [] } });
        
        const mockContextValue = {
            watchList: [],
            addToWatchList: vi.fn(),
            removeFromWatchList: vi.fn(),
        };

        render(
            <MemoryRouter>
                <MovieContext.Provider value={mockContextValue}>
                    <Movie/>
                </MovieContext.Provider>
            </MemoryRouter>
        );
        
        const heading = screen.getByText("Trending Movies");
        const movieList = screen.getByTestId("movie-list");
        const pagination = screen.getByTestId("pagination");
        const spinner = screen.queryByTestId("spinner");
        const snackbar = screen.queryByTestId("snackbar");
        const prevButton = screen.getByTestId("prev-button");
        const nextButton = screen.getByTestId("next-button");
        expect(heading).toBeInTheDocument();
        expect(movieList).toBeInTheDocument();
        expect(pagination).toBeInTheDocument();
        expect(spinner).not.toBeInTheDocument();
        expect(snackbar).not.toBeInTheDocument();
        expect(prevButton).toBeInTheDocument();
        expect(nextButton).toBeInTheDocument();
        })
})