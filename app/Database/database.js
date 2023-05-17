/* eslint-disable prettier/prettier */
export function createTableEvent(db) {
    db.transaction(function (txn) {
        txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='table_event'",
            [],
            function (tx, res) {
                console.log('item:', res.rows.length);
                if (res.rows.length === 0) {
                    txn.executeSql('DROP TABLE IF EXISTS table_event', []);
                    txn.executeSql(
                        'CREATE TABLE IF NOT EXISTS table_event(user_id VARCHAR(20), event_id INTEGER PRIMARY KEY AUTOINCREMENT, event_name VARCHAR(20), event_date INT(10), event_time INT(10), event_address VARCHAR(255), event_description VARCHAR(255), event_image VARCHAR(255))',
                        [],
                    );
                }
            },
        );
    });
}

export function createTableUserDetails(db) {
    db.transaction(function (txn) {
        txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='user_details'",
            [],
            function (tx, res) {
                console.log('item:', res.rows.length);
                if (res.rows.length === 0) {
                    txn.executeSql('DROP TABLE IF EXISTS user_details', []);
                    txn.executeSql(
                        'CREATE TABLE IF NOT EXISTS user_details(user_id VARCHAR(20), first_name VARCHAR(30), last_name VARCHAR(30), email_id VARCHAR(50), profilr_url VARCHAR(300) , contact_number INTEGER(20))',
                        [],
                    );
                }
            },
        );
    });
}

export function createTableFavouriteEvent(db) {
    db.transaction(function (txn) {
        txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='table_favourite_event'",
            [],
            function (tx, res) {
                if (res.rows.length === 0) {
                    txn.executeSql('DROP TABLE IF EXISTS table_favourite_event', []);
                    txn.executeSql(
                        'CREATE TABLE IF NOT EXISTS table_favourite_event(event_id INT(10), user_id INT(20),like_button BOOLEAN DEFAULT 1)',
                        [],
                    );
                }
            },
        );
    });
}

export function createTableTicket(db) {
    db.transaction(function (txn) {
        txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='table_ticket'",
            [],
            function (tx, res) {
                if (res.rows.length === 0) {
                    txn.executeSql('DROP TABLE IF EXISTS table_ticket', []);
                    txn.executeSql(
                        'CREATE TABLE IF NOT EXISTS table_ticket(ticket_id INTEGER PRIMARY KEY AUTOINCREMENT,event_id INT(10), ticket_type VARCHAR(20), ticket_price DECIMAL(10,2), ticket_valid_date INT(10),max_ticket INT(10))',
                        [],
                    );
                }
            },
        );
    });
}

export function createTableMyTicket(db) {
    db.transaction(function (txn) {
        txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='table_my_ticket'",
            [],
            function (tx, res) {
                if (res.rows.length === 0) {
                    txn.executeSql('DROP TABLE IF EXISTS table_ticket', []);
                    txn.executeSql(
                        'CREATE TABLE IF NOT EXISTS table_my_ticket(ticket_id INT(10),event_id INT(10),user_id INT(10),time INT(20),number_of_tickets INT(10))',
                        [],
                    );
                }
            },
        );
    });
}

export function insertUserDetails() {

}