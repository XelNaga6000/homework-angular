15.01.2021
initial commit
Modifed package.json start script
Added FirstComponent
Added properties to FirstComponent
Added Product component
Added ProductList component; Added ProductsService; Added Product model; Remove First component
Changed folder structure
Added CartList component; Added Cart service
Added CartItem model; Added remove functionallity
Added changelog.md
Minor Fixes

19.01.2021
Fixed code according to comments
Changed folder structure according to comments

28.01.2021
Added separate modules
Changed Product component; Moved all logic to its parent - ProductList

30.01.2021
Added CartItem component; Moved all logic to its parent; Refactored and extended Cart service; Use OnPush strategy wher possible; Refactored models a little
Added DOM events into CartItem and Product components
Added header into App component and set its text via ViewChild
Added highlight directive; TSLint fixes

31.01.2021
Modified Cart service and modified components which are using it accordingly

01.02.2021
Created ConfigOptions service and Config interface
Created Constants token/instance; Added Firat Component

02.02.2021
Added Generator service and factory
Added LocalStorage service
Added Border directive

08.02.2021
Fixed task 3 comments
Added currency pipe to cart-item, cart-list and product components
Changed getProduct to return Promise; Added async pipe to products-list component
Added orderBy pipe; Small improvements;

09.02.2021
Fix string sorting; Used OrderBy pipe in cart-list component; Rearenged modules imports

16.02.2021
Added basic routing; Redesign UI (npm install needed!)
Added ProductView component; Moved Products routing to Products module

21.02.2021
Created ProcessOrder component; Added IsEmptyCart guard

02.03.2021
Improved usability
Added admin routes and stub components