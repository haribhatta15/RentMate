import SignUp from '../Components/SignUp';
import Home from '../Components/Home';
import HomeMenu from '../TabScreens/HomeMenu';
import Input from '../Components/Input';
import ItemsPosted from '../ListViews/ItemsPosted';

const Navigator = createNativeStackNavigator(
  {
    Home: {
      screen: Home,
    },
    SignUpForm: {
      screen: SignUp,
    },
    Input: {
      screen: Input,
    },
    HomeMenu: {
      screen: HomeMenu,
    },
    ItemPosted: {
      screen: ItemsPosted,
    },
  },

  {
    initialRouteName: 'Home',
  }
);
export default createAppContainer(Navigator);
