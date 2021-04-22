import * as React from 'react';
import { TextField } from '@fluentui/react';

export interface ITextFilterProps {
  onTextChanged: any;
}

export default class TextFilter extends React.Component<ITextFilterProps, {}> {

  // TODO: use debouncing to avoid too many calls when typing into the search box 

  public render(): React.ReactElement<ITextFilterProps> {
    return (
      <TextField placeholder='Type here to filter list below...' onChange={(input, text) => this.props.onTextChanged(text)}/>
    );
  }

}
