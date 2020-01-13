import { h, Fragment } from 'preact';
import { Container, Row } from 'reactstrap';

const AppNexusAdPage = () => {

    return (
        <Container>
            <div className="d-flex flex-column">
                Below the placement
                <h1>Using AppNexus Publisher Ad Server</h1>
                <h5>Div-1</h5>
                <div id="div-1">
                    <script type="text/javascript">{
                        apntag.anq.push(function() {
                        apntag.showTag('div-1');
                    })}

                    </script>
                </div>

                <br />

                    <h5>Div-2</h5>
                    <div id="div-2">
                        <script type="text/javascript"> {
                            apntag.anq.push(function() {
                            apntag.showTag('div-2');
                            })}
                        </script>
                    </div>
            </div>
        </Container>
    )
};

export default AppNexusAdPage;