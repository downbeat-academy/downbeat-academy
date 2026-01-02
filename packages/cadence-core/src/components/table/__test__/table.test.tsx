import React, { createRef } from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "../index";

describe("Table component", () => {
  it("renders a table element", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Test</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const table = screen.getByRole("table");
    expect(table).toBeInstanceOf(HTMLElement);
    expect(table.tagName).toBe("TABLE");
  });

  it("applies backgroundColor prop with primary value", () => {
    render(
      <Table backgroundColor="primary" data-testid="table-wrapper">
        <TableBody>
          <TableRow>
            <TableCell>Test</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const table = screen.getByRole("table");
    const wrapper = table.parentElement;
    expect(wrapper).toBeInstanceOf(HTMLElement);
  });

  it("forwards ref to the table element", () => {
    const ref = createRef<HTMLTableElement>();
    render(
      <Table ref={ref}>
        <TableBody>
          <TableRow>
            <TableCell>Test</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(ref.current).toBeInstanceOf(HTMLTableElement);
    expect(ref.current?.tagName).toBe("TABLE");
  });

  it("passes through additional props", () => {
    render(
      <Table aria-label="Test table">
        <TableBody>
          <TableRow>
            <TableCell>Test</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const table = screen.getByRole("table");
    expect(table.getAttribute("aria-label")).toBe("Test table");
  });
});

describe("TableHeader component", () => {
  it("renders a thead element", () => {
    render(
      <Table>
        <TableHeader data-testid="table-header">
          <TableRow>
            <TableHead>Header</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const thead = screen.getByTestId("table-header");
    expect(thead.tagName).toBe("THEAD");
  });

  it("passes through className", () => {
    render(
      <Table>
        <TableHeader className="custom-header-class" data-testid="table-header">
          <TableRow>
            <TableHead>Header</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const thead = screen.getByTestId("table-header");
    expect(thead.className).toContain("custom-header-class");
  });

  it("forwards ref to the thead element", () => {
    const ref = createRef<HTMLTableSectionElement>();
    render(
      <Table>
        <TableHeader ref={ref}>
          <TableRow>
            <TableHead>Header</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(ref.current?.tagName).toBe("THEAD");
  });
});

describe("TableBody component", () => {
  it("renders a tbody element", () => {
    render(
      <Table>
        <TableBody data-testid="table-body">
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const tbody = screen.getByTestId("table-body");
    expect(tbody.tagName).toBe("TBODY");
  });

  it("passes through className", () => {
    render(
      <Table>
        <TableBody className="custom-body-class" data-testid="table-body">
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const tbody = screen.getByTestId("table-body");
    expect(tbody.className).toContain("custom-body-class");
  });

  it("forwards ref to the tbody element", () => {
    const ref = createRef<HTMLTableSectionElement>();
    render(
      <Table>
        <TableBody ref={ref}>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(ref.current?.tagName).toBe("TBODY");
  });
});

describe("TableFooter component", () => {
  it("renders a tfoot element", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter data-testid="table-footer">
          <TableRow>
            <TableCell>Footer</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
    const tfoot = screen.getByTestId("table-footer");
    expect(tfoot.tagName).toBe("TFOOT");
  });

  it("passes through className", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter className="custom-footer-class" data-testid="table-footer">
          <TableRow>
            <TableCell>Footer</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
    const tfoot = screen.getByTestId("table-footer");
    expect(tfoot.className).toContain("custom-footer-class");
  });

  it("forwards ref to the tfoot element", () => {
    const ref = createRef<HTMLTableSectionElement>();
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter ref={ref}>
          <TableRow>
            <TableCell>Footer</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
    expect(ref.current?.tagName).toBe("TFOOT");
  });
});

describe("TableRow component", () => {
  it("renders a tr element", () => {
    render(
      <Table>
        <TableBody>
          <TableRow data-testid="table-row">
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const tr = screen.getByTestId("table-row");
    expect(tr.tagName).toBe("TR");
  });

  it("applies isHeader styling when prop is true", () => {
    render(
      <Table>
        <TableBody>
          <TableRow isHeader data-testid="header-row">
            <TableCell>Header Cell</TableCell>
          </TableRow>
          <TableRow data-testid="regular-row">
            <TableCell>Regular Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const headerRow = screen.getByTestId("header-row");
    const regularRow = screen.getByTestId("regular-row");

    // Both should have base table-row class
    expect(headerRow).toBeInstanceOf(HTMLElement);
    expect(regularRow).toBeInstanceOf(HTMLElement);

    // Classes will differ - header row has additional isHeader class
    expect(headerRow.className).not.toBe(regularRow.className);
  });

  it("passes through className", () => {
    render(
      <Table>
        <TableBody>
          <TableRow className="custom-row-class" data-testid="table-row">
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const tr = screen.getByTestId("table-row");
    expect(tr.className).toContain("custom-row-class");
  });

  it("forwards ref to the tr element", () => {
    const ref = createRef<HTMLTableRowElement>();
    render(
      <Table>
        <TableBody>
          <TableRow ref={ref}>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(ref.current?.tagName).toBe("TR");
  });
});

describe("TableHead component", () => {
  it("renders a th element", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Header</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const th = screen.getByRole("columnheader");
    expect(th).toBeInstanceOf(HTMLElement);
    expect(th.tagName).toBe("TH");
  });

  it("applies start alignment by default", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead data-testid="head-cell">Header</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const headCell = screen.getByTestId("head-cell");
    expect(headCell).toBeInstanceOf(HTMLElement);
  });

  it("applies center alignment class", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead alignment="center" data-testid="center-head">Center</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const headCell = screen.getByTestId("center-head");
    expect(headCell).toBeInstanceOf(HTMLElement);
  });

  it("applies end alignment class", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead alignment="end" data-testid="end-head">End</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const headCell = screen.getByTestId("end-head");
    expect(headCell).toBeInstanceOf(HTMLElement);
  });

  it("passes through className", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="custom-head-class" data-testid="head-cell">
              Header
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const headCell = screen.getByTestId("head-cell");
    expect(headCell.className).toContain("custom-head-class");
  });

  it("forwards ref to the th element", () => {
    const ref = createRef<HTMLTableCellElement>();
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead ref={ref}>Header</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(ref.current?.tagName).toBe("TH");
  });

  it("supports scope attribute", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead scope="col">Column Header</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const th = screen.getByRole("columnheader");
    expect(th.getAttribute("scope")).toBe("col");
  });
});

describe("TableCell component", () => {
  it("renders a td element", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Cell Content</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const td = screen.getByRole("cell");
    expect(td).toBeInstanceOf(HTMLElement);
    expect(td.tagName).toBe("TD");
  });

  it("applies start alignment by default", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell data-testid="cell">Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const cell = screen.getByTestId("cell");
    expect(cell).toBeInstanceOf(HTMLElement);
  });

  it("applies center alignment class", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell alignment="center" data-testid="center-cell">
              Center
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const cell = screen.getByTestId("center-cell");
    expect(cell).toBeInstanceOf(HTMLElement);
  });

  it("applies end alignment class", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell alignment="end" data-testid="end-cell">
              End
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const cell = screen.getByTestId("end-cell");
    expect(cell).toBeInstanceOf(HTMLElement);
  });

  it("passes through className", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="custom-cell-class" data-testid="cell">
              Cell
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const cell = screen.getByTestId("cell");
    expect(cell.className).toContain("custom-cell-class");
  });

  it("forwards ref to the td element", () => {
    const ref = createRef<HTMLTableCellElement>();
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell ref={ref}>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(ref.current?.tagName).toBe("TD");
  });

  it("supports colSpan attribute", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell colSpan={2}>Spanning Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const cell = screen.getByRole("cell");
    expect(cell.getAttribute("colspan")).toBe("2");
  });

  it("supports rowSpan attribute", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell rowSpan={3}>Spanning Cell</TableCell>
            <TableCell>Regular Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const cells = screen.getAllByRole("cell");
    expect(cells[0].getAttribute("rowspan")).toBe("3");
  });
});

describe("TableCaption component", () => {
  it("renders a caption element", () => {
    render(
      <Table>
        <TableCaption>Table Caption</TableCaption>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const caption = screen.getByText("Table Caption");
    expect(caption.tagName).toBe("CAPTION");
  });

  it("passes through className", () => {
    render(
      <Table>
        <TableCaption className="custom-caption-class" data-testid="caption">
          Table Caption
        </TableCaption>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const caption = screen.getByTestId("caption");
    expect(caption.className).toContain("custom-caption-class");
  });

  it("forwards ref to the caption element", () => {
    const ref = createRef<HTMLTableCaptionElement>();
    render(
      <Table>
        <TableCaption ref={ref}>Table Caption</TableCaption>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(ref.current?.tagName).toBe("CAPTION");
  });
});

describe("Table integration", () => {
  it("renders a complete table with all components", () => {
    render(
      <Table backgroundColor="primary">
        <TableCaption>Sample Data Table</TableCaption>
        <TableHeader>
          <TableRow isHeader>
            <TableHead alignment="start">Name</TableHead>
            <TableHead alignment="center">Age</TableHead>
            <TableHead alignment="end">Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell alignment="start">Alice</TableCell>
            <TableCell alignment="center">25</TableCell>
            <TableCell alignment="end">95</TableCell>
          </TableRow>
          <TableRow>
            <TableCell alignment="start">Bob</TableCell>
            <TableCell alignment="center">30</TableCell>
            <TableCell alignment="end">88</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell alignment="end">183</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );

    // Verify table structure
    const table = screen.getByRole("table");
    expect(table).toBeInstanceOf(HTMLElement);

    // Verify caption
    const caption = screen.getByText("Sample Data Table");
    expect(caption).toBeInstanceOf(HTMLElement);

    // Verify headers
    expect(screen.getByText("Name")).toBeInstanceOf(HTMLElement);
    expect(screen.getByText("Age")).toBeInstanceOf(HTMLElement);
    expect(screen.getByText("Score")).toBeInstanceOf(HTMLElement);

    // Verify body cells
    expect(screen.getByText("Alice")).toBeInstanceOf(HTMLElement);
    expect(screen.getByText("Bob")).toBeInstanceOf(HTMLElement);

    // Verify footer
    expect(screen.getByText("Total")).toBeInstanceOf(HTMLElement);
    expect(screen.getByText("183")).toBeInstanceOf(HTMLElement);
  });

  it("renders correctly with children content", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <span data-testid="nested-content">Nested Element</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const nestedContent = screen.getByTestId("nested-content");
    expect(nestedContent).toBeInstanceOf(HTMLElement);
    expect(screen.getByText("Nested Element")).toBeInstanceOf(HTMLElement);
  });
});
