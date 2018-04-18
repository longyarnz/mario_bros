export function FlatList(props) {
  const { list, listView } = props;
  return Array.isArray(list) ? (
    list.map(listView)
  ) : null;
}

export function ForLoop(props) {
  let { times, loopView } = props;
  const loopItems = [];
  for(let i = 0; i < times; i++){
    loopItems.push(
      loopView(i)
    )
  }
  return loopItems;
}