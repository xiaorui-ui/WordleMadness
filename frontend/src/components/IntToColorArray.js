export default function IntToColorArray(x, len) {
    const colors = ["grey", "goldenrod", "green"];
    var ans = [];
    for (let i = 0; i < len; i++) {
        ans.push(colors[x % 3]);
        x = Math.floor(x / 3);
    }
    console.log(ans);
    return ans;
}