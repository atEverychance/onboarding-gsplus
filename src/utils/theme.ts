export const getThemeColor = (gender?: string) => {
  switch (gender) {
    case "man":
      return "#0B5E8E"
    case "woman":
      return "#B24A7E"
    default:
      return "#0E4B47"
  }
}
