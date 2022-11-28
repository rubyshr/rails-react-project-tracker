import React from 'react';
import { connect } from 'react-redux';
import { isNew } from './story_util.jsx';

class StoryBlocker extends React.Component {
  constructor(props) {
    super(props);

    this.handleFocus = this.handleFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  componentDidMount() {
    if (this.props.isNew) {
      this.textInput.focus();
    }
    this.resizeInput();
  }

  componentWillReceiveProps() {
    this.resizeInput();
  }

  render() {
    const { blocker, isNew } = this.props;
    return (
      <div className={`story-task`}>
        <textarea
          ref={instance => this.textInput = instance }
          rows='1'
          type='text'
          value={blocker.block_reason}
          onFocus={this.handleFocus(true)}
          onBlur={this.handleFocus(false)}
          onChange={this.handleChange} />
        <button
          className='story-task-delete-btn'
          onClick={this.handleDelete}>
          <i className='fa fa-trash-o'/>
        </button>
        <button
          ref={instance => this.saveButton = instance}
          className='hide'
          onClick={this.handleSave}>
          Save
        </button>
      </div>
    );
  }

  handleFocus(focus) {
    return (e) => {
      if (focus) {
        this.saveButton.classList.remove('hide');
      } else {
        //  Delay hiding the button because otherwise you can't click on it
        window.setTimeout(() => {
          this.saveButton && this.saveButton.classList.add('hide')
        }, 100);
      }
    }
  }

  handleChange(e) {
    this.props.handleChange('block_reason', e.currentTarget.value);
  }

  handleCheckbox(e) {
    const blocker = this.props.blocker;
    this.props.handleSave(Object.assign({}, blocker, { done: !blocker.done }));
  }

  handleSave(e) {
    this.props.handleSave(this.props.blocker)
  }

  handleDelete(e) {
    this.props.handleDelete(this.props.blocker);
  }

  resizeInput() {
    window.setTimeout(() => {
      if (this.textInput) {
        this.textInput.style.height = 'auto';
        this.textInput.style.height = this.textInput.scrollHeight  + 'px';
      }
    }, 0);
  }
}

const mapStateToProps = (state, {blocker}) => ({
  isNew: isNew(blocker) // used to set initial focus
});

export default connect(mapStateToProps)(StoryBlocker);

