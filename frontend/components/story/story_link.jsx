import React from 'react';
import { connect } from 'react-redux';
import { isNew } from './story_util.jsx';

class StoryLink extends React.Component {
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
    const { link, isNew } = this.props;
    return (
      <div className={`story-task`}>
        <textarea
          ref={instance => this.textInput = instance }
          rows='1'
          type='text'
          value={link.related_link}
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
    this.props.handleChange('related_link', e.currentTarget.value);
  }

  handleCheckbox(e) {
    const link = this.props.link;
    this.props.handleSave(Object.assign({}, link, { done: !link.done }));
  }

  handleSave(e) {
    this.props.handleSave(this.props.link)
  }

  handleDelete(e) {
    this.props.handleDelete(this.props.link);
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

const mapStateToProps = (state, {link}) => ({
  isNew: isNew(link) // used to set initial focus
});

export default connect(mapStateToProps)(StoryLink);

