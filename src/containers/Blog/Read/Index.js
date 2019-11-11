import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import axios from '../../../axios-orders';

import Aux from '../../../hoc/Auxiliary';

class Index extends Component {

    componentDidMount() {
        this.props.onInitBlog();
    }

    render() {
        const blogEntriesArray = [];
        for (let i = 0; i <= 10; i++) {
            blogEntriesArray.push({
                id: i,
                entry: this.props.blogEntries[i]
            });
        }
        let blog = null;
        console.log(blogEntriesArray);
        if (blogEntriesArray[0].entry) {
            blog = (<Aux>
                {
                    blogEntriesArray.map(entry => (
                        <div>
                            <h1>{entry.entry.title}</h1>
                            <p>{entry.entry.body}</p>
                        </div>
                    ))
                }
            </Aux>)
        }
        return (
            <div>
                {blog}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitBlog: () => dispatch(actions.initBlog())
    }
}

const mapStateToProps = state => {
    return {
        blogEntries: state.blog.blog
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index, axios);