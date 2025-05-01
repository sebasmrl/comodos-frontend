

export default async function AnuncioPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    return (
        //TODO: get ad info or redirect

        <div>
            <h1>Anuncio Page {(await params).id}</h1>
        </div>
    );
}