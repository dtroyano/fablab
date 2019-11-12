import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import * as actions from '../../../store/actions';
import axios from '../../../axios-orders';

import BlogEntry from '../../../components/Blog/BlogEntry';
import Aux from '../../../hoc/Auxiliary';

class Index extends Component {
    constructor(props) {
        super(props);
        this.props.onInitBlog();
    }

    state = {
        entry: {},
        loaded: false
    }

    loadEntry = (entry) => {
        this.setState({ entry: entry, loaded: true });
    }

    render() {
        const { match } = this.props;
        const blogEntriesArray = [];
        for (let i = 0; i < this.props.blogEntries.length - 1; i++) {
            blogEntriesArray.push({
                id: this.props.blogEntries[i].id,
                entry: this.props.blogEntries[i]
            });
        }
        let blog = null;
        if (blogEntriesArray.length > 0) {
            blog = (<Aux>
                {
                    blogEntriesArray.map(entry => {
                        return (
                            <div>
                                <h1><Link onClick={() => this.loadEntry(entry.entry)} to={'/blog/' + entry.id}>{entry.entry.title.rendered}</Link></h1>
                                <p>{/*entry.content*/}</p>
                            </div>
                        )
                    })
                }
            </Aux>)
        }
        let entry = (
            <div>LOADING</div>
        );
        if (this.state.loaded) {
            entry = (
                <BlogEntry
                    loaded={this.state.loaded}
                    entry={this.state.entry} />

            );
        }
        return (
            <Switch>
                <Route path={`${match.path}/:id`}>
                    {entry}
                </Route>
                <Route path={`${match.path}`}>
                    <div>
                        {blog}
                    </div>
                </Route>
            </Switch>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitBlog: () => dispatch(actions.initBlog()),
        onGetBlog: (id) => dispatch(actions.getBlog(id))
    }
}

const mapStateToProps = state => {
    return {
        blogEntries: state.blog.blog,
        entry: state.blog.entry,
        loaded: state.blog.loaded
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index, axios);