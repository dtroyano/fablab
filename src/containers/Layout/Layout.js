import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class Layout extends Component {
    render() {
        return (
            <Aux>
                <Header />
                <main>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc leo quam, pretium eu tellus vitae, laoreet vehicula urna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla porta, urna id elementum efficitur, urna eros efficitur enim, ac iaculis tortor est in est. Praesent pellentesque nisi odio, eu suscipit metus finibus vitae. Nulla convallis odio nec metus sodales sollicitudin sit amet a purus. Nullam ornare turpis eget tortor eleifend luctus. In at convallis ligula. Suspendisse quis aliquam nulla. Nam dignissim tellus at ex mattis molestie. Morbi fringilla ante nec justo fermentum ultrices. Nulla dapibus sapien tortor.</p>

                    <p>Mauris auctor ullamcorper enim eget rutrum. Fusce dignissim sem odio. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec sed ultrices sem, at pharetra orci. Nunc pulvinar mattis faucibus. Ut malesuada ante dui, sit amet congue nisi iaculis ac. Suspendisse quis erat quis arcu interdum mattis. Sed eleifend ac dolor at viverra. Mauris at lobortis dui. Phasellus eros sem, luctus at mauris sed, feugiat ullamcorper ipsum. Praesent quis lectus felis. Nam in fermentum velit. Ut vestibulum semper lectus sed ornare. Ut laoreet, mi iaculis blandit faucibus, ex elit tristique dui, eu porta erat diam vel mi. Proin et ex justo. Phasellus vel scelerisque leo.</p>

                    <p>Vivamus lacus eros, rutrum nec sapien in, commodo consequat lacus. Sed mattis enim enim, vitae maximus risus fermentum et. Etiam ante turpis, molestie vitae quam at, luctus iaculis mi. In vel leo a erat consequat gravida nec quis dolor. Fusce in tempor ex. Maecenas ac nisl ipsum. Curabitur ac nulla metus. Fusce at aliquam velit, in aliquam ligula. Vivamus consequat sapien et tortor aliquam rhoncus vel ac mi. Maecenas et viverra orci, et euismod risus. Etiam tincidunt ipsum sit amet sapien bibendum dignissim. Aliquam blandit dictum dui congue tincidunt.</p>

                    <p>Nunc suscipit tempor sapien a euismod. Vivamus at condimentum dui. Donec ultrices facilisis enim, eget tempor elit sollicitudin a. Donec imperdiet quam at erat dapibus tempor. Praesent volutpat hendrerit odio ut tempor. Mauris auctor risus id quam ornare tempor. Fusce ac quam non felis efficitur pulvinar ut a purus. Nulla nunc diam, semper et tortor vitae, posuere euismod ex. Curabitur non ipsum sed enim finibus auctor et sed leo. Pellentesque et ligula a lorem dictum accumsan. Morbi at scelerisque arcu. Nunc semper vitae eros vitae faucibus.</p>

                    <p>Morbi ac diam a arcu pharetra venenatis vel sit amet tellus. Proin molestie odio sed nisi imperdiet, eu accumsan leo ultrices. Nulla vitae ipsum neque. Sed vel velit nec odio consectetur condimentum. Mauris vestibulum felis ex, ut fringilla orci cursus et. Proin nec mauris metus. In vel elit semper, aliquam ex non, lobortis dui. Sed scelerisque hendrerit ex, ut consequat sem tincidunt eu. Praesent facilisis enim eget eros commodo pretium. Fusce a ultricies est. Integer id enim quis augue varius hendrerit eget eget orci. Vestibulum commodo ultricies quam, posuere luctus quam pulvinar in. Vivamus dolor massa, imperdiet id pretium vehicula, varius in urna. Praesent sagittis mi a nulla faucibus pellentesque.</p>
                    {this.props.children}
                </main>
                <Footer />
            </Aux >
        );
    }
}

export default Layout;