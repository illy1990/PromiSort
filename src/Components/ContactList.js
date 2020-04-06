// --------------------------------- Simple Version - working! ---------------------------------

// import React from 'react';
// import ContactItem from "./ContactItem"
// import contacts from "../Components/contacts.json";

// const data = contacts.map((x) =>
//     <ContactItem
//         name={x.name}
//         pictureUrl={x.pictureUrl}
//         key={x}
//         popularity={x.popularity} />
// )

// const ContactList = () => {
//     return (
//         <section>
//             {data}
//         </section>
//     )
// }

// export default ContactList;

// --------------------------------- Simple Version - working! ---------------------------------

// --------------------------------- Complex Version ---------------------------------
import React, { Component } from 'react';
import contacts from "../Components/contacts.json";
import contactslong from "../Components/contactsLong.json"
import ContactItem from "./ContactItem";



class ContactData extends Component {
    state = {
        contactState: contacts,
        contactStateLong: contactslong,
        isShown: true,
        randomZahl: 0,
        deleteButtonCount: this.props.DeleteOnButton,
        sortUp: true,
        sortUp2: true,
    }

    NewContactAdded = () => {
        this.setState({ randomZahl: Math.floor(Math.random() * 194) })
        let gekurzt = this.state.contactStateLong.slice(this.state.randomZahl, (this.state.randomZahl + 1));
        let anhang = this.state.contactState;
        anhang.concat(gekurzt)
        this.setState({ contactState: anhang.concat(gekurzt) })
    }

    ShowAllTheFaces = () => {
        if (this.state.isShown === true) {
            let verlangert = this.state.contactStateLong;
            let anhang2 = this.state.contactState;
            // anhang2.concat(verlangert)
            this.setState({ contactState: anhang2.concat(verlangert) })
            this.setState({ isShown: !this.state.isShown });
        }
        else if (this.state.isShown === false) {
            let gekurzt2 = this.state.contactState.slice(0, 5);
            this.setState({ contactState: gekurzt2 })
            this.setState({ isShown: !this.state.isShown });
        }
        else { }
    }
    // Lösch-Code 1 funktionierend
    // DeleteOnButton = (elt) => {
    //     let neuerwert;
    //     for (var i = 0; i < this.state.contactState.length; i++) {
    //         if (this.state.contactState[i].popularity === elt) {
    //             neuerwert = i;
    //             let positionLoschung = this.state.contactState;
    //             positionLoschung.splice(neuerwert, 1)
    //             this.setState({ contactState: positionLoschung })
    //         }
    //     }
    // }

    // Lösch-Code 2 funktionierend
    DeleteOnButton = elt => {
        const items = this.state.contactState.filter(neuesElt => neuesElt.popularity !== elt);
        this.setState({ contactState: items });
    };

    handleSortAZ = () => {
        const sortedArray = this.state.contactState.sort((a, b) => {
            let eltA = a.name.toUpperCase();
            let eltB = b.name.toUpperCase();
            if (eltA < eltB) {
                return -1;
            } else if (eltA > eltB) {
                return 1;
            } else { return 0 }
        });
        this.setState({ contactState: sortedArray });
    };

    handleSortZA = () => {
        const sortedArray = this.state.contactState.sort((a, b) => {
            let eltA = a.name.toUpperCase();
            let eltB = b.name.toUpperCase();
            if (eltA < eltB) {
                return 1;
            } else if (eltA > eltB) {
                return -1;
            } else { return 0 }
        });
        this.setState({ contactState: sortedArray });
    };


    handleSortAZUNDZA = () => {
        if (this.state.sortUp === true) {
            this.handleSortAZ();
            this.setState({ sortUp: !this.state.sortUp })
        } else {
            this.handleSortZA();
            this.setState({ sortUp: !this.state.sortUp })
        }
    }

    SorteRateLowHighUNDHighLow = () => {
        if (this.state.sortUp2 === true) {
            this.SortRateLowHigh();
            this.setState({ sortUp2: !this.state.sortUp2 })
        } else {
            this.SortRateHighLow();
            this.setState({ sortUp2: !this.state.sortUp2 })
        }
    }

    SortRateLowHigh = () => {
        const sortedArray = this.state.contactState.sort((a, b) => {
            let eltA = a.popularity;
            let eltB = b.popularity;
            if (eltA < eltB) {
                return -1;
            } else if (eltA > eltB) {
                return 1;
            } else { return 0 }
        });
        this.setState({ contactState: sortedArray });
    };

    SortRateHighLow = () => {
        const sortedArray = this.state.contactState.sort((a, b) => {
            let eltA = a.popularity;
            let eltB = b.popularity;
            if (eltA < eltB) {
                return 1;
            } else if (eltA > eltB) {
                return -1;
            } else { return 0 }
        });
        this.setState({ contactState: sortedArray });
    };

    render() {
        return (
            < section >
                <div>
                    <button onClick={this.NewContactAdded}>Neuen Promi hinzufügen</button>
                    <button onClick={this.handleSortAZ}>Sortieren A-Z</button>
                    <button onClick={this.handleSortZA}>Sortieren Z-A</button>
                    <button onClick={this.handleSortAZUNDZA}>A-Z oder Z-A</button>
                    <button onClick={this.SortRateLowHigh}>Popularität aufsteigend</button>
                    <button onClick={this.SortRateHighLow}>Popularität absteigend</button>
                    <button onClick={this.SorteRateLowHighUNDHighLow}>Popularität aufsteigend oder absteigend</button>
                    <button onClick={this.ShowAllTheFaces}>Show all 200 oder blende alle bis auf 5 aus</button>
                </div>
                <header className="Grid">
                    <h1>Picture</h1>
                    <h1>Name</h1>
                    <h1>Popularity</h1>
                    <h1>Action</h1>
                </header>
                {
                    this.state.contactState.map((x, i) =>
                        <ContactItem
                            name={x.name}
                            pictureUrl={x.pictureUrl}
                            key={i}
                            popularity={x.popularity}
                            DeleteOnButton={this.DeleteOnButton}
                        />)
                }

                {/* {this.state.contactStateLong.map((w, j) =>
                    <div style={this.state.isShown ? { display: "block" } : { display: "none" }}>
                        <ContactItem
                            name={w.name}
                            pictureUrl={w.pictureUrl}
                            key={j}
                            popularity={w.popularity} />
                    </div>
                )
                } */}


            </section >
        );
    }
}

export default ContactData;






// --------------------------------- Complex Version ---------------------------------