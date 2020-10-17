export function getCurrentYYYYMMDDDate() {
    let d = new Date().toLocaleString();
    let [month, day, year] = d.split("/");
    year = year.split(',')[0];

    return `${year}-${month}-${day}`;
}