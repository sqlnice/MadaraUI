import React from 'react';
import Tabs, { ITabProps } from './tabs';
import TabsItem, { ITabsItemProps } from './tabsItem';

type TabsComponent = React.FC<ITabProps> & {
  Item?: React.FC<ITabsItemProps>;
};

let TransTab: TabsComponent = Tabs;
TransTab.Item = TabsItem;

// export type {TabProps, ITabsItemProps}
export default TransTab;
