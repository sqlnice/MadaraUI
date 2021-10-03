import './styles/index.scss';
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button
          onClick={(e) => {
            e.preventDefault();
            alert('click');
          }}
        >
          Hello
        </Button>
        <Button disabled>Disabled Button</Button>
        <Menu
          defaultIndex="0"
          mode="vertical"
          defaultOpenSubMenus={['2']}
          onSelect={(index) => {
            console.log(index);
          }}
        >
          <MenuItem disabled>link 1</MenuItem>
          <MenuItem>link 2</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
          </SubMenu>
          <MenuItem>link 3</MenuItem>
        </Menu>
      </header>
    </div>
  );
}

export default App;
