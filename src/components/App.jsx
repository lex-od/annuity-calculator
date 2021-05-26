import "./App.module.scss";
import Container from "./Container";
import RangeInput from "./RangeInput";

export default function App() {
    return (
        <Container>
            <RangeInput min="1" max="10" step="1" />
        </Container>
    );
}
