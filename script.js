const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage();
calculateTotal();

container.addEventListener('click', function (e) {

    // Eğer bir film seçili değilse, koltuk seçimini engelle
    if (select.value === "0") {
        alert("Lütfen önce bir film seçiniz!");
        return;
    }

    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected');
        calculateTotal();

    }
});

select.addEventListener('change', function (e) {
    // Eğer "Film Seçiniz" dışında bir şey seçildiyse, "Film Seçiniz" seçeneğini devre dışı bırak
    if (select.value !== "0") {
        select.querySelector('.selectFilm').disabled = true;
    }

    calculateTotal();
});

function calculateTotal() {

    const selectedSeats = container.querySelectorAll('.seat.selected');

    const selectedSeatsArr = [];
    const seatsArr = [];

    selectedSeats.forEach(function (seat) {
        selectedSeatsArr.push(seat);
    });

    seats.forEach(function (seat) {
        seatsArr.push(seat);
    });

    let selectedSeatIndexs = selectedSeatsArr.map(function (seat) {
        return seatsArr.indexOf(seat);
    });


    saveToLocalStorage(selectedSeatIndexs);



    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value;
}

function saveToLocalStorage(indexs) {
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);

}

function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function (seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex;

        // Eğer bir film seçilmişse, "Film Seçiniz" seçeneğini devre dışı bırak
        if (select.value !== "0") {
            select.querySelector('.selectFilm').disabled = true;
        }
    }
}