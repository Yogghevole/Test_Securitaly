You are a Senior Product Designer specialized in Enterprise SaaS applications.

Design the complete UI/UX of a modern DVD Rental Management System.

This is NOT a dashboard template or a generic CRUD.

It is a real management application that should feel polished, coherent and ready for daily use.

The application is for a technical interview.

Prioritize UX, workflow consistency and usability over flashy visuals.

Think like a Product Designer, not like a UI Designer.

Reduce clicks.
Reduce cognitive load.
Avoid duplicated functionality.
Design workflows before screens.

Use Ant Design.

Visual style:
- Inter font
- Light theme
- Primary #1677FF
- Background #F5F7FA
- White cards
- Rounded corners (10-12px)
- Very subtle shadows
- Desktop first
- Responsive

--------------------------------------------------
APPLICATION STRUCTURE
--------------------------------------------------

Only four pages:

- Dashboard
- DVD Catalog
- Customers
- Rental History

There is NO Returns page.

Returns are managed directly from Rental History.

--------------------------------------------------
LAYOUT
--------------------------------------------------

Ant Design Layout.

Sidebar

Header

Content

--------------------------------------------------
SIDEBAR
--------------------------------------------------

Expanded:

First row:

[Logo] DVD Rental                              [Collapse]

Logo aligned left.

Title next to the logo.

Collapse button aligned completely right.

Use a minimal custom collapse icon.

Collapsed:

Do NOT display an expand button.

Display ONLY the application logo.

When hovering the logo:

Fade the logo into the expand icon.

Click expands the sidebar.

When leaving:

Fade back into the logo.

250-300ms transition.

Below:

Dashboard

DVD Catalog

Customers

Rental History

Icons only.

Bottom:

Laravel + React

Version 1.0

Green Connected indicator.

--------------------------------------------------
HEADER
--------------------------------------------------

Minimal.

Only:

Page title

Breadcrumb

Admin avatar

--------------------------------------------------
DASHBOARD
--------------------------------------------------

The Dashboard is NOT a place to perform actions.

Do NOT add buttons like:

New Rental

Register Return

New Customer

The Dashboard is an operational overview only.

Display only information requiring attention.

Returns Expected Today

Late Returns

Need Attention

Recent Activity

Clicking Returns Today or Late Returns opens Rental History already filtered.

No charts.

No KPIs.

No generic statistics.

--------------------------------------------------
DVD CATALOG
--------------------------------------------------

The Catalog has two states.

Browse Mode

Rental Mode

Browse Mode:

Search

Filters

DVD Table

Columns:

Cover

Title

Category

Duration

Availability

No checkboxes.

No rental controls.

No cart.

Primary button:

New Rental

Rental Mode:

Display a top action banner.

Rental Mode

Select one or more DVDs

Cancel

The table gains a checkbox column.

Only now can DVDs be selected.

Cancel returns to Browse Mode.

Rental Cart:

Hidden by default.

Appears only after selecting the first movie.

Disappears automatically when no movies remain selected.

Slide in from the right.

Fixed width.

Do not shrink the table excessively.

Each movie displays ONLY:

Cover

Title

Remove button

Bottom:

Selected DVDs count

Continue (N)

Continue disabled until at least one movie is selected.

Rental Drawer:

Continue opens a Drawer.

Display:

Customer selector

Rental Date (default today)

Expected Return Date

Complete movie summary:

Cover

Title

Category

Duration

Primary button:

Confirm Rental

One Rental record is created for every selected DVD.

--------------------------------------------------
CUSTOMERS
--------------------------------------------------

Search

Customers table

Columns:

First Name

Last Name

Email

Active Rentals

Clicking a customer opens a Drawer.

Display:

Customer Information

Current Active Rentals

Rental History

Creating a customer also uses a Drawer.

Fields:

First Name

Last Name

Email

Save Customer

Never navigate to another page.

--------------------------------------------------
RENTAL HISTORY
--------------------------------------------------

This page also has two states.

Browse Mode

Return Mode

Browse Mode:

Search

Filters

Rental table

Status

Expected Return colors

No return controls.

Statuses:

On Time

Due Soon

Overdue

Returned On Time

Returned Late

Expected Return colors:

Green

Yellow

Red

Return Mode:

Primary button:

Register Return

Top action banner:

Return Mode

Search Customer

Cancel

After selecting a customer:

Automatically display ONLY that customer's active rentals.

Allow selecting multiple movies.

Return Cart:

Initially hidden.

Appears after first selection.

Disappears when empty.

Fixed width.

Do not shrink the table excessively.

Each movie:

Cover

Title

Remove button

Bottom:

Continue (N)

Return Drawer:

Customer

Return Date (default today)

Selected movies

Each movie:

Cover

Title

Category

Duration

If one or more movies are overdue:

Display an INLINE Alert above the Confirm button.

Never use floating notifications.

Example:

2 selected movies are overdue.

Matrix

4 days late

Cars

2 days late

Confirm Return

Rental History table:

Display:

Expected Return

Returned Date

Delay

Returned Date becomes red when returned late.

Display:

Returned On Time

Returned Late

Example:

Expected

10 Jul

Returned

14 Jul

Delay

+4 days

--------------------------------------------------
UX PRINCIPLES
--------------------------------------------------

The application revolves around two identical interaction models.

Rental Workflow

Browse Catalog

↓

Rental Mode

↓

Rental Cart

↓

Rental Drawer

↓

Confirm Rental

Return Workflow

Browse Rental History

↓

Return Mode

↓

Return Cart

↓

Return Drawer

↓

Confirm Return

Both workflows should feel almost identical.

Users learn one interaction model and reuse it everywhere.

Temporary UI elements (checkboxes, carts, action banners, drawers) only exist while performing an action.

Browse Mode always remains clean.

Every page should answer only one question:

Dashboard → What requires attention today?

DVD Catalog → Which movies can I rent?

Customers → Who are my customers?

Rental History → What happened to every rental?

Do not redesign for aesthetics.

Refine the product.

Make it feel like enterprise software designed by an experienced Product Designer.