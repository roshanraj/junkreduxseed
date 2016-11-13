import React from 'react';
import './editor.scss';
import ReactDOM  from 'react-dom';
import { EditorState, RichUtils} from 'draft-js';

import Editor from 'draft-js-plugins-editor';
import createHashtagPlugin from 'draft-js-hashtag-plugin'; // eslint-disable-line import/no-unresolved
// Creates an Instance. At this step, a configuration object can be passed in
// as an argument.
const hashtagPlugin = createHashtagPlugin();


import 'draft-js-hashtag-plugin/lib/plugin.css'; // eslint-disable-line import/no-unresolved

// key binding
import {getDefaultKeyBinding, KeyBindingUtil} from 'draft-js';
const {hasCommandModifier} = KeyBindingUtil;


class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});

  }


 // custom databinding
 myKeyBindingFn = (e: SyntheticKeyboardEvent) => {

    if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
        console.log("custom works ");
      return 'myeditor-save';
    }

    if (e.keyCode === 13 && e.shiftKey) {
        console.log("shift + enter");
        return getDefaultKeyBinding(e);

    } else if (e.keyCode === 13) {
        console.log("just enter pressed");
        this.setState({editorState: EditorState.createEmpty()});
        return 'enter-only';
    }

    return getDefaultKeyBinding(e);
  }

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        handleKeyCommand={this.handleKeyCommand}
        keyBindingFn={this.myKeyBindingFn}
        plugins={[hashtagPlugin]}
        onChange={this.onChange}


      />
    );
  }
}
export default MyEditor;
