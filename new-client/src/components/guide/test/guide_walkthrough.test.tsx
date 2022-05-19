import { render, screen, fireEvent } from "../../../test-utils/context-wrapper";
import App from "../../../App";
import React from "react";

describe("guide functionality", () => {
  beforeEach(async () => {
    render(<App />);
    // make sure we are logged in
    expect(await screen.findByRole("button", { name: /dirk/i })).toBeInTheDocument();
    fireEvent.click(await screen.findByRole("button", { name: /dirk/i }));
    fireEvent.click(await screen.findByRole("button", { name: /app guide/i }));
    fireEvent.click(await screen.findByRole("button", { name: /start/i }));
  });

  test("walkthrough displays all instruction-steps", async () => {
    // step 1
    const div = await (
      await screen.findByRole("button", { name: /2021/i })
    ).parentElement?.parentElement;
    div &&
      expect(div.getAttribute("data-tooltip")).toBe(
        "This is the datemenu. Here you navigate in your timeline"
      );
    expect(await screen.findByText(/the date-menu is your main/i)).toBeInTheDocument();
    // step 2
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    const btn = await screen.findByRole("button", { name: /2021/i });
    expect(btn.getAttribute("data-tooltip")).toBe("Here you navigate to Year");
    expect(
      screen.getByText(/under year you will find a statistic summary for the year/i)
    ).toBeInTheDocument();
    // step 3
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    const btn2 = await screen.findByRole("button", { name: /january/i });
    expect(btn2.getAttribute("data-tooltip")).toBe(
      "Here you navigate to Month by pressing any month"
    );
    expect(screen.getByText(/under month you will find a statistic summary/i)).toBeInTheDocument();
    // step 4
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    const btn3 = await screen.findByRole("button", { name: /add to budget/i });
    expect(btn3.getAttribute("data-tooltip")).toBe("To open add to budget you click here");
    expect(screen.getByText("Add to Budget")).toBeInTheDocument(); // note the exact text to catch guide modal text.
    // step 5
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    const guideText = screen.getByTestId("presetform_closebtn");
    expect(guideText?.parentElement?.getAttribute("data-tooltip")).toBe(
      "Here you add transactions for this month by giving the name,number and category. Overhead option will add it to your income and expenses"
    );
    expect(screen.getByText(/add to budget: overhead/i)).toBeInTheDocument();
    // step 6
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    expect(
      screen.getByRole("button", { name: /upload csv-file/i }).getAttribute("data-tooltip")
    ).toBe("You can also upload month-transactions from a file");
    expect(screen.getByText(/add to budget: upload csv/i)).toBeInTheDocument();
    // step 7
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    const guideTextSeven = screen.getByRole("heading", { name: "Add to" });
    expect(guideTextSeven?.parentElement?.parentElement?.getAttribute("data-tooltip")).toBe(
      "To add initial capital to your account, you select capital here. This will be added to your account balance and year summary"
    );
    expect(screen.getByText(/add to budget: capital/i)).toBeInTheDocument();
    // step 8
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    const guideTextEight = screen.getByRole("heading", { name: "Add to" });
    expect(guideTextEight?.parentElement?.parentElement?.getAttribute("data-tooltip")).toBe(
      "To add savings from your month surplus, you select savings here"
    );
    expect(screen.getByText(/add to budget: savings/i)).toBeInTheDocument();
    // step 9
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    const guideTextNine = screen.getByRole("heading", { name: "Add to" });
    expect(guideTextNine?.parentElement?.parentElement?.getAttribute("data-tooltip")).toBe(
      "To setup a purchase plan you select purchase here and fill in the cost of the purchase in Number field."
    );
    expect(screen.getByText(/you can make a purchase plan/i)).toBeInTheDocument();
    // step 10
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    const guideTextTen = screen.getByRole("heading", { name: "Purchases" });
    expect(guideTextTen?.parentElement?.getAttribute("data-tooltip")).toBe("Purchases");
    expect(screen.getByText(/if the month has sufficient month surplus/i)).toBeInTheDocument();
    // step 11
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    expect(screen.getByRole("button", { name: /2021/i }).getAttribute("data-tooltip")).toBe(
      "Here you navigate to Year"
    );
    expect(screen.getByText(/to go back to year summary/i)).toBeInTheDocument();
    // step 12
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    expect(screen.getByRole("button", { name: /balance/i }).getAttribute("data-tooltip")).toBe(
      "Balance Summary"
    );
    expect(screen.getByText(/under year there are 4 summary/i)).toBeInTheDocument();
    // step 13
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    expect(screen.getByRole("button", { name: /expense/i }).getAttribute("data-tooltip")).toBe(
      "To get to Expense Summary you press here"
    );
    expect(
      screen.getByText(/under expense summary in year-tab, you get a good overview/i)
    ).toBeInTheDocument();
    // step 14
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    expect(screen.getByRole("button", { name: /income/i }).getAttribute("data-tooltip")).toBe(
      "To get to Income Summary you press here"
    );
    expect(screen.getByText(/income summary gives you a chart/i)).toBeInTheDocument();
    // step 15
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    expect(
      screen.getByRole("button", { name: /Savings Summary/i }).getAttribute("data-tooltip")
    ).toBe("To get to Savings Summary you press here");
    expect(screen.getByText(/savings summary gives overview/i)).toBeInTheDocument();
    // step 16
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    expect(screen.getByText(/guide complete/i)).toBeInTheDocument();
  });

  test("jumping with navigation-button-dots work", async () => {
    // Testing DotStepsMenu-component and it's communication with the context through setGuide
    // NOTE that steps below do no correlate with my naming of steps in the comments of the walkthrough-test above.
    // Jump to step 7
    fireEvent.click(screen.getByLabelText("Guide-step 7"));
    expect(
      screen.getByRole("button", { name: /upload csv-file/i }).getAttribute("data-tooltip")
    ).toBe("You can also upload month-transactions from a file");
    expect(screen.getByText(/add to budget: upload csv/i)).toBeInTheDocument();
    // Jump to step 4
    fireEvent.click(screen.getByLabelText("Guide-step 4"));
    const btn2 = await screen.findByRole("button", { name: /january/i });
    expect(btn2.getAttribute("data-tooltip")).toBe(
      "Here you navigate to Month by pressing any month"
    );
    expect(screen.getByText(/under month you will find a statistic summary/i)).toBeInTheDocument();
    // Jump to step 14
    fireEvent.click(screen.getByLabelText("Guide-step 14"));
    expect(screen.getByRole("button", { name: /expense/i }).getAttribute("data-tooltip")).toBe(
      "To get to Expense Summary you press here"
    );
    expect(
      screen.getByText(/under expense summary in year-tab, you get a good overview/i)
    ).toBeInTheDocument();
    // Jump to step 2
    fireEvent.click(screen.getByLabelText("Guide-step 2"));
    const div = await (
      await screen.findByRole("button", { name: /2021/i })
    ).parentElement?.parentElement;
    div &&
      expect(div.getAttribute("data-tooltip")).toBe(
        "This is the datemenu. Here you navigate in your timeline"
      );
    expect(await screen.findByText(/the date-menu is your main/i)).toBeInTheDocument();
  });

  test("going back with previous button works", async () => {
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    fireEvent.click(screen.getByRole("button", { name: /previous/i }));
    const btn = await screen.findByRole("button", { name: /2021/i });
    expect(btn.getAttribute("data-tooltip")).toBe("Here you navigate to Year");
    expect(
      screen.getByText(/under year you will find a statistic summary for the year/i)
    ).toBeInTheDocument();
  });

  test("pressing exit removes guide and its temp-presets", async () => {
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    fireEvent.click(screen.getByRole("button", { name: /exit/i }));
    expect(
      await (
        await screen.findByText("Year Summary:")
      ).parentElement?.children[1].textContent
    ).toBe("990543");
  });
});
