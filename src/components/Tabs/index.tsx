import { FC } from 'react';
import Tabs, { ITabProps } from './tabs';
import TabsItem, { ITabsItemProps } from './tabsItem';

type TabsComponent = FC<ITabProps> & {
  Item?: FC<ITabsItemProps>;
};

let TransTab: TabsComponent = Tabs;
TransTab.Item = TabsItem;

export default TransTab;
