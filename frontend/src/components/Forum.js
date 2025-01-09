import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card, Modal, ListGroup, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faFlag, faComment } from "@fortawesome/free-solid-svg-icons";
import "../css/Forum.css";

function Forum() {
    const [posts, setPosts] = useState([]); // Speichert die Beiträge aus dem Backend
    const [newPostTitle, setNewPostTitle] = useState("");
    const [newPostContent, setNewPostContent] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [newComment, setNewComment] = useState("");

    // Beiträge beim Laden der Seite aus dem Backend holen
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("http://localhost:5001/forum");
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error("Fehler beim Laden der Beiträge:", error);
            }
        };
        fetchPosts();
    }, []);

    // Beitrag hinzufügen
    const handleAddPost = async (event) => {
        event.preventDefault(); // Verhindert das Neuladen der Seite
        if (!newPostTitle.trim() || !newPostContent.trim()) return alert("Bitte alle Felder ausfüllen.");

        try {
            const response = await fetch("http://localhost:5001/forum", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: newPostTitle, content: newPostContent, username: "Anonymous" }),
            });
            if (response.ok) {
                const newPost = await response.json();
                setPosts([newPost, ...posts]);
                setNewPostTitle("");
                setNewPostContent("");
            } else {
                alert("Fehler beim Erstellen des Beitrags.");
            }
        } catch (error) {
            console.error("Serververbindung fehlgeschlagen:", error);
        }
    };

    // Beitrag liken
    const handleLikePost = async (id) => {
        try {
            await fetch(`http://localhost:5001/forum/like/${id}`, { method: "POST" });
            setPosts(posts.map(post => post.id === id ? { ...post, likes: post.likes + 1 } : post));
        } catch (error) {
            console.error("Fehler beim Liken des Beitrags:", error);
        }
    };

    // Beitrag melden
    const handleReportPost = async (id) => {
        try {
            await fetch(`http://localhost:5001/forum/report/${id}`, { method: "POST" });
            alert("Beitrag gemeldet.");
        } catch (error) {
            console.error("Fehler beim Melden des Beitrags:", error);
        }
    };

    // Einzelansicht des Beitrags anzeigen und Kommentare laden
    const handleOpenPost = async (post) => {
        try {
            const response = await fetch(`http://localhost:5001/forum/comments/${post.id}`);
            const comments = await response.json();
            setSelectedPost({ ...post, comments });
            setShowModal(true);
        } catch (error) {
            console.error("Fehler beim Abrufen der Kommentare:", error);
        }
    };

    // Kommentar hinzufügen
    const handleAddComment = async (event) => {
        event.preventDefault(); // Verhindert Neuladen der Seite
        if (!newComment.trim()) return alert("Bitte einen Kommentar eingeben.");

        try {
            const response = await fetch("http://localhost:5001/forum/comment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    postId: selectedPost.id,
                    comment: newComment,
                    username: "Anonymous"
                }),
            });

            if (response.ok) {
                const newCommentData = await response.json();
                setSelectedPost((prevPost) => ({
                    ...prevPost,
                    comments: [...prevPost.comments, newCommentData]
                }));
                setNewComment("");
            } else {
                alert("Fehler beim Hinzufügen des Kommentars.");
            }
        } catch (error) {
            console.error("Fehler beim Hinzufügen des Kommentars:", error);
        }
    };

    return (
        <Container className="mt-5">
            <h1 className="text-center">Forum</h1>

            {/* Neuen Beitrag erstellen */}
            <Form className="mb-4" onSubmit={handleAddPost}>
                <Form.Group controlId="newPostTitle">
                    <Form.Label>Titel</Form.Label>
                    <Form.Control
                        type="text"
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                        placeholder="Beitragstitel eingeben..."
                    />
                </Form.Group>
                <Form.Group controlId="newPostContent" className="mt-2">
                    <Form.Label>Inhalt</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        placeholder="Beitragsinhalt eingeben..."
                    />
                </Form.Group>
                <Button className="mt-3" type="submit">Beitrag erstellen</Button>
            </Form>

            {/* Beitragsliste */}
            <h2 className="text-center">Beiträge</h2>
            {posts.map((post) => (
                <Card key={post.id} className="mb-3">
                    <Card.Body>
                        <Card.Title
                            onClick={() => handleOpenPost(post)}
                            style={{ cursor: "pointer", color: "#067285" }}
                        >
                            {post.title}
                        </Card.Title>
                        <Card.Text>{post.content}</Card.Text>
                        <p><strong>Erstellt von:</strong> {post.username}</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <Badge pill bg="primary">{post.likes} Likes</Badge>
                            <div className="d-flex gap-2">
                                <Button variant="outline-danger" onClick={() => handleLikePost(post.id)}>
                                    <FontAwesomeIcon icon={faHeart} />
                                </Button>
                                <Button variant="outline-warning" onClick={() => handleReportPost(post.id)}>
                                    <FontAwesomeIcon icon={faFlag} />
                                </Button>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            ))}

            {/* Modal für Einzelansicht */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedPost?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{selectedPost?.content}</p>
                    <p><strong>Erstellt von:</strong> {selectedPost?.username}</p>
                    <hr />
                    <h5>Kommentare</h5>
                    <ListGroup>
                        {selectedPost?.comments?.map((comment, index) => (
                            <ListGroup.Item key={index}>
                                <strong>{comment.username}</strong>: {comment.comment}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                    {/* Kommentar hinzufügen */}
                    <Form className="mt-3" onSubmit={handleAddComment}>
                        <Form.Control
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Neuen Kommentar schreiben..."
                        />
                        <Button className="mt-2" type="submit">Kommentar hinzufügen</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default Forum;