const serviceList = document.querySelector('#service-list');
const form = document.querySelector('#add-service-form');

// create element & render service
function renderService(doc){
    let tr = document.createElement('tr');
    let type = document.createElement('td');
    let customer = document.createElement('td');
    let day = document.createElement('td');
    let month = document.createElement('td');
    let year = document.createElement('td');
    let time = document.createElement('td');
    let cross = document.createElement('td');
    type.className = "servicetype";
    customer.className = "customer";
    day.className = "time";
    month.className = "time";
    year.className = "time";
    time.className = "time";
    cross.className = "crossbutton";

    tr.setAttribute('data-id', doc.id);
    type.textContent = doc.data().type;
    customer.textContent = doc.data().customer;
    day.textContent = doc.data().day;
    month.textContent = doc.data().month;
    year.textContent = doc.data().year;
    time.textContent = doc.data().time;
    cross.textContent = 'x';

    tr.appendChild(type);
    tr.appendChild(customer);
    tr.appendChild(day);
    tr.appendChild(month);
    tr.appendChild(year);
    tr.appendChild(time);
    tr.appendChild(cross);

    serviceList.appendChild(tr);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('services').doc(id).delete();
    });
}

// getting data
// db.collection('services').orderBy('city').get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc);
//     });
// });

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('services').add({
        type: form.type.value,
        customer: form.customer.value,
        day: form.day.value,
        month: form.month.value,
        year: form.year.value,
        time: form.time.value
    });
    form.type.value = '';
    form.customer.value = '';
    form.day.value = '';
    form.month.value = '';
    form.year.value = '';
    form.time.value = '';
});

// real-time listener
db.collection('services').orderBy('month').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderService(change.doc);
        } else if (change.type == 'removed'){
            let tr = serviceList.querySelector('[data-id=' + change.doc.id + ']');
            serviceList.removeChild(tr);
        }
    });
});

// updating records (console demo)
// db.collection('services').doc('DOgwUvtEQbjZohQNIeMr').update({
//     name: 'mario world'
// });

// db.collection('services').doc('DOgwUvtEQbjZohQNIeMr').update({
//     city: 'hong kong'
// });

// setting data
// db.collection('services').doc('DOgwUvtEQbjZohQNIeMr').set({
//     city: 'hong kong'
// });