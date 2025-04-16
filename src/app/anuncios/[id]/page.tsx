

export default async function AnuncioPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    return (
        <div>
            <h1>Anuncio Page {(await params).id}</h1>
        </div>
    );
}