export default function UserGuide() {
    return (
        <div>
            <header>
                <h1>User Guide</h1>
            </header>
            <main>
                <a href="/">Back to Welcome</a><div style={{ height: "30px" }}></div>
                <a href="#decision-tree">Jump to Decision Tree</a><br />
                <a href="#section-3">Jump to section 3</a><br />
                <a href="#section-4">Jump to section 4</a><br />

                <h2 id="section-2"> Decision Tree </h2>
                <p>
                    sample text
                </p>

                <h2 id="section-3">Section 3</h2>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                </p>
                <h2 id="section-4">Section 4</h2>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                </p>

                <p>Go to the <a href="#section-1">top</a>.
                </p>
            </main>
        </div>

    )
}