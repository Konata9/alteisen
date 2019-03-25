import { Component } from "react";

export default class Bundle extends Component<any, any> {
  state: any = {
    mod: null
  };

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load(props: any) {
    this.setState({
      mod: null
    });

    props.load().then((mod: any) => {
      this.setState({
        mod: mod.default ? mod.default : mod
      });
    });
  }

  render(): any {
    return this.state.mod ? this.props.children(this.state.mod) : null;
  }
}
