var budgetcontroller = (function() {
    var Expense = function(id, description, value) {

        this.id = id;
        this.description = description;
        this.value = value;

    };
    var Income = function(id, description, value) {

        this.id = id;
        this.description = description;
        this.value = value;

    };
    var data = { //data sutructure for storing the expenses
        allItems: {
            exp: [],
            inc: [],

        },
        alltotals: {
            exp: 0,
            inc: 0,

        }


    };
    return {
        addItem: function(type, des, val) {
            var newItem, ID;
            // Creating a new Id here to assign the item
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }


            // Creating a new item based on the exp or inc
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            //pusing the data
            data.allItems[type].push(newItem);

            return newItem;

        },
        testing: function() {
            console.log(data);
        }
    }

})();



/* UI Module*/

var UIController = (function() {


    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'

    };


    return {
        getInput: function() {

            return {

                type: document.querySelector(DOMstrings.inputType).value, // either  inc or the expense
                discription: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };

        },

        addListItem: function(obj, type) {
            var html, Element;

            //HTMl String with the new HTML sibling           
            if (type === 'exp') {
                Element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            } else if (type === 'inc') {
                Element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            //replacing the placeholder text with input data
            newhtml = html.replace('%id%', obj.id);
            newhtml = newhtml.replace('%description%', obj.description);
            newhtml = newhtml.replace('%value%', obj.value);

            document.querySelector(Element).insertAdjacentHTML('beforeend', newhtml);

        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    };


})();


var controller = (function(budgetCtrl, UICtrl) {



    var SetupEventListners = function() {

        var DOM = UIController.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {

            if (event.keyCode === 13 || event.which === 13) {

                ctrlAddItem();
            }


        });

    }

    // prepending here so taht the function is scoped inside here only 
    var ctrlAddItem = function() {
        var newItem, input;

        Input = UIController.getInput();
        newItem = budgetcontroller.addItem(Input.type, Input.discription, Input.value);
        UIController.addListItem(newItem, Input.type);
    }

    return {
        Init: function() {
            SetupEventListners();
        }
    }


})(budgetcontroller, UIController);

controller.Init();