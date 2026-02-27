const elements = document.querySelectorAll(".my-age")

const specificDate = new Date("2010-05-11T22:50:00");
const updateAge = () => {
    const currentDate = new Date();
    const age = (
        (currentDate - specificDate) /
        (1000 * 60 * 60 * 24 * 365.25)
    ).toFixed(15);
    let nextBirthday = new Date(specificDate);
    nextBirthday.setFullYear(currentDate.getFullYear());
    if (currentDate > nextBirthday) {
        nextBirthday.setFullYear(currentDate.getFullYear() + 1);
    }
    const timeDiff = nextBirthday - currentDate;
    const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    elements.forEach(e => {
        e.textContent = `${age}`;
        e.title = `${daysLeft} days left`;
    })
    requestAnimationFrame(updateAge);
}
updateAge();

