
export function sequalize(data) {
    let f = parseInt(data);
    console.log(f);
    return (isNaN(f) ? 0 : f)
}