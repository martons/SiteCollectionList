import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import SiteCollectionList, { ISiteCollectionListProps } from './components/SiteCollectionList/SiteCollectionList';


export default class SiteCollectionListWebPart extends BaseClientSideWebPart<{}> {

  public render(): void {
    const element: React.ReactElement<ISiteCollectionListProps> = React.createElement(
      SiteCollectionList,
      {
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: []
    };
  }
}
