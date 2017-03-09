export function splitNames(names){
  return names.split("\n").map(name => name.trim()).filter(name => name)
}
