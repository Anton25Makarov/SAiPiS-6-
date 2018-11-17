let databaseObject = {};
databaseObject.functions = {};
databaseObject.data = {};

/**********************************************BD****************************************************************/
// on load
databaseObject.functions.createBd = function () {
    databaseObject.data = openDatabase("StudentsTestDatabase", "1.0", "", 5 * 1024 * 1024);
    databaseObject.functions.createStudentsTable();
    databaseObject.functions.executeAllFromBdToSet();
};
// create table
databaseObject.functions.createStudentsTable = function () {
    databaseObject.data.transaction(function (tx) {
        tx.executeSql("create table if not exists studentsTable(" +
            "cs_id integer primary key autoincrement," +
            "cs_firstName varchar(20)," +
            "cs_secondName varchar(20)," +
            "cs_address varchar(20)," +
            "cs_class varchar(20)," +
            "cs_olympic varchar(20)," +
            "cs_other varchar(40)" +
            ")", [],
            function () {
                // alert("Table was successfully created !");
                // console.log("Table was successfully created !");
            },
            function () {
                // alert("Operation failed !");
                // console.log("Operation failed !");
            });
    });
};
// user to bd
databaseObject.functions.addStudentInTableBd = function (student) {
    databaseObject.data.transaction(function (tx) {
            tx.executeSql(`insert into studentsTable (cs_firstName, cs_secondName, cs_address, cs_class, cs_olympic, cs_other)
values ('${student._firstName}',
        '${student._secondName}',
        '${student._address}',
        '${student._classNum}',
        '${student._olympic}',
        '${student._other}')`, [],
                function () {
                    clearAllFields();
                    // alert("Data successfully inserted !");
                    // console.log("Data successfully inserted !");
                },
                function () {
                    // alert("Data inserting failed !");
                    // console.log("Data inserting failed !");
                });
        }
    );
};
// from bd to Set
databaseObject.functions.executeAllFromBdToSet = function () {
    let resultArray = [];
    databaseObject.data.transaction(function (tx) {
        tx.executeSql("SELECT * FROM studentsTable", [],
            function (tx, resultSet) { // good select
                // alert("Success SELECT * FROM studentsTable");
                for (let i = 0; i < resultSet.rows.length; i++) {
                    resultArray[i] = resultSet.rows.item(i);
                }
                clearSet();
                // результат селекта в Set
                for (let i = 0; i < resultArray.length; i++) {
                    let user = new User(
                        resultArray[i]["cs_firstName"],
                        resultArray[i]["cs_secondName"],
                        resultArray[i]["cs_address"],
                        resultArray[i]["cs_class"],
                        resultArray[i]["cs_olympic"],
                        resultArray[i]["cs_other"]
                    );
                    user.id = resultArray[i]["cs_id"];
                    studentsSet.add(user);
                }
                clearIds();
                writeIds();
            }, function (tx, error) {
                // alert("Bad SELECT * FROM studentsTable");
            })
    })
};

databaseObject.functions.deleteAllRowsInTable = function () {
    databaseObject.data.transaction(function (tx) {
        tx.executeSql('DELETE FROM studentsTable', [], function () {
                // alert("Table truncate !");
            },
            function () {
                // alert("Table truncate failed !");
            });
    })
};

databaseObject.functions.deleteAllInSqlLiteSequence = function () {
    databaseObject.data.transaction(function (tx) {
        tx.executeSql('DELETE FROM sqlite_sequence  where name = "studentsTable"', [], function () {
                // alert("Table truncate !");
            },
            function () {
                // alert("Table truncate failed !");
            });
    })
};

function fullDeleteFromDb() {
    databaseObject.functions.deleteAllRowsInTable();
    databaseObject.functions.deleteAllInSqlLiteSequence();
}

/**********************************************BD****************************************************************/

/**********************************************HTML****************************************************************/
let tableShow = false;

function showAndHideTable() {

    if (tableShow === false) {
        if (document.getElementById("myTable") != null) {
            document.getElementById("tableAllStudents").removeChild(document.getElementById("myTable"));
        }

        let table = document.createElement("TABLE");
        table.setAttribute("id", "myTable");

        let id_m = document.createElement("TH");
        let firstName_m = document.createElement("TH");
        let secondName_m = document.createElement("TH");
        let address_m = document.createElement("TH");
        let classNum_m = document.createElement("TH");
        let olympic_m = document.createElement("TH");
        let other_m = document.createElement("TH");

        let id_text_m = document.createTextNode("ID");
        let firstName_text_m = document.createTextNode("First name");
        let secondName_text_m = document.createTextNode("Second name");
        let address_text_m = document.createTextNode("Address");
        let olympic_text_m = document.createTextNode("Olympic player");
        let classNum_text_m = document.createTextNode("Class (№)");
        let other_text_m = document.createTextNode("Other information");

        id_m.appendChild(id_text_m);
        firstName_m.appendChild(firstName_text_m);
        secondName_m.appendChild(secondName_text_m);
        address_m.appendChild(address_text_m);
        classNum_m.appendChild(classNum_text_m);
        olympic_m.appendChild(olympic_text_m);
        other_m.appendChild(other_text_m);

        id_m.setAttribute("class", "myCell");
        firstName_m.setAttribute("class", "myCell");
        secondName_m.setAttribute("class", "myCell");
        address_m.setAttribute("class", "myCell");
        classNum_m.setAttribute("class", "myCell");
        olympic_m.setAttribute("class", "myCell");
        other_m.setAttribute("class", "myCell");

        let row_m = document.createElement("TR");

        row_m.appendChild(id_m);
        row_m.appendChild(firstName_m);
        row_m.appendChild(secondName_m);
        row_m.appendChild(address_m);
        row_m.appendChild(classNum_m);
        row_m.appendChild(olympic_m);
        row_m.appendChild(other_m);

        table.appendChild(row_m);

        for (let user of studentsSet) {
            let row = document.createElement("TR");

            let id = document.createElement("TD");
            let firstName = document.createElement("TD");
            let secondName = document.createElement("TD");
            let address = document.createElement("TD");
            let classNum = document.createElement("TD");
            let olympic = document.createElement("TD");
            let other = document.createElement("TD");

            id.setAttribute("class", "myCell");
            firstName.setAttribute("class", "myCell");
            secondName.setAttribute("class", "myCell");
            address.setAttribute("class", "myCell");
            classNum.setAttribute("class", "myCell");
            olympic.setAttribute("class", "myCell");
            other.setAttribute("class", "myCell");

            let id_text = document.createTextNode(user._id);
            let firstName_text = document.createTextNode(user._firstName);
            let secondName_text = document.createTextNode(user._secondName);
            let address_text = document.createTextNode(user._address);
            let classNum_text = document.createTextNode(user._classNum);
            let olympic_text = document.createTextNode(user._olympic);
            let other_text = document.createTextNode(user._other);

            id.appendChild(id_text);
            firstName.appendChild(firstName_text);
            secondName.appendChild(secondName_text);
            address.appendChild(address_text);
            classNum.appendChild(classNum_text);
            olympic.appendChild(olympic_text);
            other.appendChild(other_text);

            row.appendChild(id);
            row.appendChild(firstName);
            row.appendChild(secondName);
            row.appendChild(address);
            row.appendChild(classNum);
            row.appendChild(olympic);
            row.appendChild(other);

            table.appendChild(row);
        }

        document.getElementById("tableAllStudents").appendChild(table);
        tableShow = true;

        document.getElementById("showHideTable").value = "Hide";
    }
    else {
        if (document.getElementById("myTable") != null) {
            document.getElementById("tableAllStudents").removeChild(document.getElementById("myTable"));
        }
        document.getElementById("showHideTable").value = "Show table";
        tableShow = false;
    }
}

let tableNonOlympicShow = false;

function showAndHideTableNonOlympic() {

    if (tableNonOlympicShow === false) {
        if (document.getElementById("myTableNon") != null) {
            document.getElementById("tableNonOlympicStudents").removeChild(document.getElementById("myTableNon"));
        }

        let table = document.createElement("TABLE");
        table.setAttribute("id", "myTableNon");

        let id_m = document.createElement("TH");
        let firstName_m = document.createElement("TH");
        let secondName_m = document.createElement("TH");
        let address_m = document.createElement("TH");
        let classNum_m = document.createElement("TH");
        let other_m = document.createElement("TH");

        let id_text_m = document.createTextNode("ID");
        let firstName_text_m = document.createTextNode("First name");
        let secondName_text_m = document.createTextNode("Second name");
        let address_text_m = document.createTextNode("Address");
        let classNum_text_m = document.createTextNode("Class (№)");
        let other_text_m = document.createTextNode("Other information");

        id_m.appendChild(id_text_m);
        firstName_m.appendChild(firstName_text_m);
        secondName_m.appendChild(secondName_text_m);
        address_m.appendChild(address_text_m);
        classNum_m.appendChild(classNum_text_m);
        other_m.appendChild(other_text_m);

        id_m.setAttribute("class", "myCell");
        firstName_m.setAttribute("class", "myCell");
        secondName_m.setAttribute("class", "myCell");
        address_m.setAttribute("class", "myCell");
        classNum_m.setAttribute("class", "myCell");
        other_m.setAttribute("class", "myCell");

        let row_m = document.createElement("TR");

        row_m.appendChild(id_m);
        row_m.appendChild(firstName_m);
        row_m.appendChild(secondName_m);
        row_m.appendChild(address_m);
        row_m.appendChild(classNum_m);
        row_m.appendChild(other_m);

        table.appendChild(row_m);

        for (let user of studentsSet) {
            if (user._olympic === "no") {
                let row = document.createElement("TR");

                let id = document.createElement("TD");
                let firstName = document.createElement("TD");
                let secondName = document.createElement("TD");
                let address = document.createElement("TD");
                let classNum = document.createElement("TD");
                let other = document.createElement("TD");

                id.setAttribute("class", "myCell");
                firstName.setAttribute("class", "myCell");
                secondName.setAttribute("class", "myCell");
                address.setAttribute("class", "myCell");
                classNum.setAttribute("class", "myCell");
                other.setAttribute("class", "myCell");

                let id_text = document.createTextNode(user._id);
                let firstName_text = document.createTextNode(user._firstName);
                let secondName_text = document.createTextNode(user._secondName);
                let address_text = document.createTextNode(user._address);
                let classNum_text = document.createTextNode(user._classNum);
                let other_text = document.createTextNode(user._other);

                id.appendChild(id_text);
                firstName.appendChild(firstName_text);
                secondName.appendChild(secondName_text);
                address.appendChild(address_text);
                classNum.appendChild(classNum_text);
                other.appendChild(other_text);

                row.appendChild(id);
                row.appendChild(firstName);
                row.appendChild(secondName);
                row.appendChild(address);
                row.appendChild(classNum);
                row.appendChild(other);

                table.appendChild(row);
            }
        }

        document.getElementById("tableNonOlympicStudents").appendChild(table);
        tableNonOlympicShow = true;

        document.getElementById("showHideOlympicTable").value = "Hide non olympics";
    }
    else {
        if (document.getElementById("myTableNon") != null) {
            document.getElementById("tableNonOlympicStudents").removeChild(document.getElementById("myTableNon"));
        }
        document.getElementById("showHideOlympicTable").value = "Show table non olympics";
        tableNonOlympicShow = false;
    }
}

function writeIds() {
    let selector = document.getElementById("idSelectList");

    for (let user of studentsSet) {
        let option = document.createElement("OPTION");
        option.value = user._id.toString();
        option.text = user._id;
        selector.add(option);
    }
}

function clearIds() {
    let selector = document.getElementById("idSelectList");

    while (selector.firstChild) {
        selector.removeChild(selector.firstChild);
    }
}

function getCurrentIndex() {
    let selected = document.getElementById("idSelectList");
    if (selected.selectedIndex === -1) { //Не выбрано ничего
        return;
    }
    return selected.options[selected.selectedIndex].text;
}

let othersShown = false;

function addRemoveOthers() {
    if (othersShown === false) {
        let othersLabel = document.getElementById("labelForOthers");
        othersLabel.innerText = "Other: ";

        let otherInput = document.createElement("INPUT");
        otherInput.id = "other";

        document.getElementById("inputOther").appendChild(otherInput);

        othersShown = true;
        document.getElementById("otherBut").value = "Remove property";
    } else {
        let othersLabel = document.getElementById("labelForOthers");
        othersLabel.innerText = "";

        if (document.getElementById("other") != null) {
            document.getElementById("inputOther").removeChild(document.getElementById("other"));
        }

        othersShown = false;
        document.getElementById("otherBut").value = "Add property";
    }
}

function clearAllFields() {
    document.getElementById("firstName").value = "";
    document.getElementById("secondName").value = "";
    document.getElementById("address").value = "";
    document.getElementById("numberOfClass").value = "";
    if (document.getElementById("other") != null) {
        document.getElementById("other").value = "";
    }
    document.getElementById("olympicYes").checked = false;
    document.getElementById("olympicNo").checked = false;
}

function addPropertyOtherById() {

    let selectedId = getCurrentIndex();

    let answer = prompt('Other: ', "");

    if (answer === "" || answer == null) {
        return;
    }

    for (let student of studentsSet) {
        if (student._id === Number(selectedId)) {
            if (student._other === "") {
                student._other = answer;
            } else {
                student._other += ", " + answer;
            }
            break;
        }
    }
    updateBdFromSetAndGetSetFromBd();
}

function updateBdFromSetAndGetSetFromBd() {
    // databaseObject.functions.deleteAllRowsInTable();
    fullDeleteFromDb();

    for (let student of studentsSet) {
        databaseObject.functions.addStudentInTableBd(student);
    }

    databaseObject.functions.executeAllFromBdToSet();
}

function removeStudentById() {
    let selectedId = getCurrentIndex();
    let flagDeleting = false;

    for (let student of studentsSet) {
        if (student._id === Number(selectedId)) {
            flagDeleting = true;
            studentsSet.delete(student);
        }
    }

    if (flagDeleting === false) {
        return;
    }

    clearIds();
    writeIds();

    // databaseObject.functions.deleteAllRowsInTable();
    fullDeleteFromDb();

    for (let student of studentsSet) {
        databaseObject.functions.addStudentInTableBd(student);
    }

    databaseObject.functions.executeAllFromBdToSet();
}

/**********************************************HTML****************************************************************/

let studentsSet = new Set();

function clearSet() {
    studentsSet.clear();
}

class User {
    constructor(firstName, secondName, address, classNum, olympic, other) {
        this.firstName = firstName;
        this.secondName = secondName;
        this.address = address;
        this.classNum = classNum;
        this.olympic = olympic;
        this.other = other;
    }

    /*constructor(id, firstName, secondName, address, classNum, olympic, other) {
        this.firstName = firstName;
        this.secondName = secondName;
        this.address = address;
        this.classNum = classNum;
        this.olympic = olympic;
        this.other = other;
        this.id = id;
    }
*/

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        this._firstName = value;
    }

    get secondName() {
        return this._secondName;
    }

    set secondName(value) {
        this._secondName = value;
    }

    get classNum() {
        return this._classNum;
    }

    set classNum(value) {
        this._classNum = value;
    }

    get olympic() {
        return this._olympic;
    }

    set olympic(value) {
        this._olympic = value;
    }

    get other() {
        return this._other;
    }

    set other(value) {
        this._other = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }
}

function onButtonAddUser() {
    let firstName = document.getElementById("firstName").value;
    let secondName = document.getElementById("secondName").value;
    let classNum = document.getElementById("numberOfClass").value;
    let address = document.getElementById("address").value;
    let radio = document.getElementsByName("olympic");
    let olympic = "no";
    if (radio[0].checked) {
        olympic = "yes";
    }
    let other = "";
    if (document.getElementById("other") != null) {
        other = document.getElementById("other").value;
    }

    let user = new User(firstName, secondName, address, classNum, olympic, other);
    databaseObject.functions.addStudentInTableBd(user);

    databaseObject.functions.executeAllFromBdToSet();
}