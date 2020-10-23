import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import { getTweets } from "../controllers/TweetData";
import MaterialTable from 'material-table';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }

  componentWillMount() {
    getTweets().then((response) => {
      const twitterContents = []
      for (let i = 0; i <= response.data.data.length - 1; i++) {
        let content = response.data.data[i]
        let twitterContentsData = { id: content.id, text: content.text }
        twitterContents.push(twitterContentsData)
      }

      this.setState({
        data: {
          columns: [
            { title: 'ID', field: 'id' },
            { title: 'Text', field: 'text' }
          ],
          data: twitterContents,
        }
      })
    })

  }

  componentDidMount() {

  }


  render() {
    return (
      <ErrorBoundary>
        <div className="content">
          <MaterialTable
            title="Recent Twitter Dev"
            columns={this.state.data.columns}
            data={this.state.data.data}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data.push(newData);
                      return { ...prevState, data };
                    });
                  }, 600);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    if (oldData) {
                      setState((prevState) => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                      });
                    }
                  }, 600);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data.splice(data.indexOf(oldData), 1);
                      return { ...prevState, data };
                    });
                  }, 600);
                }),
            }}
          />
        </div>
      </ErrorBoundary>
    )
  }
}
export default Home;
