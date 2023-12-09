import { Tabs } from 'antd';

const items = [
  {
    key: 'Search',
    label: 'Search'
  },
  {
    key: 'Rated',
    label: 'Rated'
  }
]

function NavTabs({ onChange }) {
  return(
    <>
    <Tabs defaultActiveKey={items['Search']} items={items} onChange={onChange} centered />
    </>
  )
}

export default NavTabs;