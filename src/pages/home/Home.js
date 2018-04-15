import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {
    Redirect
} from 'react-router-dom'
import {Pagination} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withStyles } from 'material-ui/styles';
import withRoot from '../../withRoot';
import {actions as frontActions} from '../../_reducers/frontReducer'
const {get_article_list,get_article_detail} = frontActions;

const styles = theme => ({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "#eee",
    },
    paginationContainer :{
        textAlign: "center",
        margin: "30px 0"
    }
});

class Home extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        const { classes } = this.props;
        const {tags} = this.props;
        localStorage.setItem('userInfo', JSON.stringify(this.props.userInfo));
        return (
            // tags.length > 1 && this.props.match.params.tag && (tags.indexOf(this.props.match.params.tag) === -1 || this.props.location.pathname.lastIndexOf('\/') > 0)
            //     ?
            //     <Redirect to='/404'/>
            //     :
                <div className={classes.container}>
                    {/* <ArticleList
                        history={this.props.history}
                        data={this.props.articleList}
                        getArticleDetail={this.props.get_article_detail}
                    /> */}
                    <div className={classes.paginationContainer}>
                        <Pagination
                            defaultPageSize={5}
                            onChange={(pageNum) => {
                                this.props.get_article_list(this.props.match.params.tag || '', pageNum);
                            }}
                            current={this.props.pageNum}
                            total={this.props.total}/>
                    </div>
                </div>
        )
    }

    componentDidMount() {
        this.props.get_article_list(this.props.match.params.tag || '')
    }
}

Home.defaultProps = {
    userInfo: {},
    pageNum: 1,
    total: 0,
    articleList: []
};

// Home.propsTypes = {
//     pageNum: PropTypes.number.isRequired,
//     total: PropTypes.number.isRequired,
//     articleList: PropTypes.array.isRequired
// };

function mapStateToProps(state) {
    return {
        // tags: state.admin.tags,
        // pageNum: state.front.pageNum,
        // total: state.front.total,
        // articleList: state.front.articleList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_article_list: bindActionCreators(get_article_list, dispatch),
        get_article_detail:bindActionCreators(get_article_detail,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRoot(withStyles(styles)(Home)));