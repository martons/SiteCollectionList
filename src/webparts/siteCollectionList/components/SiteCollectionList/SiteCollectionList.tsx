import * as React from 'react';
import styles from './SiteCollectionList.module.scss';
import SiteCollectionService, { ISiteCollection } from 'services/SiteCollectionService';
import { SortDirection } from '@pnp/sp/search';
import { WebPartContext } from "@microsoft/sp-webpart-base";
import TextFilter from '../TextFilter/TextFilter';
import { Link, IconButton } from '@fluentui/react';
import ListFooter from '../ListFooter/ListFooter';

export interface ISiteCollectionListState {
  loaded: boolean;
  siteCollections?: ISiteCollection[];
  totalItems?: number;
  sortDirection?: SortDirection;
  filterText?: string;
  page: number;
}

export interface ISiteCollectionListProps {
  context: WebPartContext;
}

// Could be moved into webpart properties to make it configurable
const PAGE_SIZE: number = 3;
const SORT_PROPERTY: string = "RefinableString00";

export default class SiteCollectionList extends React.Component<ISiteCollectionListProps, ISiteCollectionListState> {

  private siteCollectionService: SiteCollectionService;

  constructor(props: ISiteCollectionListProps) {
    super(props);

    this.state = {
      loaded: false,
      page: 0,
    }

    this.siteCollectionService = new SiteCollectionService(this.props.context, PAGE_SIZE, SORT_PROPERTY);
  }

  public async componentDidMount() {
    await this.loadData('', 0, SortDirection.Ascending);
  }

  public render(): React.ReactElement<ISiteCollectionListProps> {
    return (
      this.state.loaded ?

      <div className={ styles.siteCollectionList }>

        <TextFilter onTextChanged={(text) => this.onFilterChange(text)} />

        <IconButton
          onClick={this.onSortDirectionChange.bind(this)}
          iconProps={{iconName: this.state.sortDirection === SortDirection.Ascending ? 'CaretSolidDown' : 'CaretSolidUp'}} />

        {this.state.siteCollections.map(siteCollection => {
          return <div>
              <Link href={siteCollection.url}>
                {siteCollection.title} - RefinableString00: {siteCollection.refinablestring}
              </Link>
            </div>
        })}

        <ListFooter
          page={this.state.page}
          pageSize={PAGE_SIZE}
          totalItems={this.state.totalItems}
          pageChanged={(page) => {
            this.loadData(this.state.filterText, page, this.state.sortDirection)
          }}>
        </ListFooter>
      </div>
      :
      <div>loading...</div>
    );
  }

  private async loadData(text: string, page: number, sortDirection: SortDirection): Promise<void> {
    const result = await this.siteCollectionService.get(text, sortDirection, page);

    this.setState({
      loaded: true,
      page: page,
      siteCollections: result.items,
      totalItems: result.totalRows,
      sortDirection: sortDirection,
      filterText: text,
    });
  }

  private async onFilterChange(text: string) {
    await this.loadData(text, 0, this.state.sortDirection);
  }

  private async onSortDirectionChange() {
    await this.loadData(
      this.state.filterText,
      this.state.page,
      this.state.sortDirection === SortDirection.Ascending ? SortDirection.Descending : SortDirection.Ascending);
  }
}
