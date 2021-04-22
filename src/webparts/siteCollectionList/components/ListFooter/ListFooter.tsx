import * as React from 'react';
import { Link } from '@fluentui/react';

export interface IListFooterProps {
  pageSize: number;
  totalItems: number;
  page: number;
  pageChanged: any;
}

export default class ListFooter extends React.Component<IListFooterProps, {}> {

  public render(): React.ReactElement<IListFooterProps> {
    return (
      <div>
        <div>
          <Link
            disabled={this.props.page === 0} 
            onClick={() => this.props.pageChanged(this.props.page - 1)}>Previous</Link>
          <Link 
            disabled={(this.props.page + 1) * this.props.pageSize > this.props.totalItems } 
            onClick={() => this.props.pageChanged(this.props.page + 1)}>Next</Link>
        </div>   
        <div>Page {this.props.page} - Total Records {this.props.totalItems}</div>
      </div>
    );
  }

}
