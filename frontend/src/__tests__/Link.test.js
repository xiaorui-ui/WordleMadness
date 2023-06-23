import renderer from 'react-test-renderer';
import Link from '../testfiles/Link';

it('changes the class when hovered', () => {
    const component = renderer.create(
        <Link page="http://localhost:3000/"> Welcome </Link>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // manually trigger the callback
    renderer.act(() => {
        tree.props.onMouseEnter();
    });
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // manually trigger the callback
    renderer.act(() => {
        tree.props.onMouseLeave();
    });
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});