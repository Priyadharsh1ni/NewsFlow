import React, { useEffect, useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { action } from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';


const Profile = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const [bio, setBio] = useState('News enthusiast. Loves tech and world news.');
    const [editing, setEditing] = useState(false);
    const [newBio, setNewBio] = useState(bio);
    const [image, setImage] = useState(null);
    const [topics, setTopics] = useState(() => {
        const savedArticles = localStorage.getItem('savedArticles');
        if (savedArticles) {
            const articles = JSON.parse(savedArticles);
            const topicsSet = new Set();
            articles.forEach(article => {
                if (article.title) {
                    topicsSet.add(article.title);

                }
            });
            return Array.from(topicsSet);
        }
        return [];
    });
    const [sources, setSources] = useState(() => {
        const savedArticles = localStorage.getItem('savedArticles');
        if (savedArticles) {
            const articles = JSON.parse(savedArticles);
            const topicsSet = new Set();
            articles.forEach(article => {
                if (article.source?.name) {
                    topicsSet.add(article.source.name);
                }
            });
            return Array.from(topicsSet);
        }
        return [];
    });
    const [newTopics, setNewTopics] = useState(topics.join(', '));
    const [newSources, setNewSources] = useState(sources.join(', '));
    // ...existing code...
    const emailObj = JSON.parse(localStorage.getItem('user'));
    const email = emailObj?.email || '';


    const [newName, setNewName] = useState()
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleEdit = () => {
        setEditing(true);
        setNewBio(bio);
        setNewTopics(topics.join(', '));
        setNewSources(sources.join(', '));
    };

    const handleCancel = () => {
        setEditing(false);
    };

    const handleSave = () => {
        setBio(newBio);
        setTopics(newTopics.split(',').map(t => t.trim()).filter(Boolean));
        setSources(newSources.split(',').map(s => s.trim()).filter(Boolean));
        setEditing(false);
        dispatch(action.updateProfile({name: newName, email: email}))
    };

    useEffect(() => {
        if (email) {
            dispatch(action.getUser({email: email }));
        }
    },[email])

    return (
        <><div style={{
            maxWidth: 900,
            margin: '48px auto',
            padding: 0,
            borderRadius: 18,
            background: '#fff',
            boxShadow: '0 4px 24px rgba(30,105,222,0.10)'
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1.5px solid #f1f3f6',
                padding: '36px 40px 24px 40px',
                gap: 32
            }}>
                <div style={{ position: 'relative' }}>
                  {image ? <img
                        src={image || 'https://via.placeholder.com/120?text=Profile'}
                        alt="Profile"
                        style={{
                            width: 120,
                            height: 120,
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '3px solid #e3e9f7'
                        }} /> : <CgProfile size={120}/>}
                    {editing && (
                        <label htmlFor="profile-image-upload" style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            background: '#1e69de',
                            color: '#fff',
                            borderRadius: '50%',
                            width: 36,
                            height: 36,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            border: '2px solid #fff',
                            fontSize: 18
                        }}>
                            <span role="img" aria-label="edit">✏️</span>
                            <input
                                id="profile-image-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }} 
                                />
                            
                        </label>
                    )}
                </div>
                <div style={{ flex: 1 }}>
                    {editing ? (
                        <>
                            <input
                                type="text"
                                value={newName}
                                onChange={e => setNewName(e.target.value)}
                                style={{
                                    fontSize: 28,
                                    fontWeight: 700,
                                    border: '1.5px solid #cfd8dc',
                                    borderRadius: 8,
                                    padding: '6px 12px',
                                    width: '100%',
                                    marginBottom: 10
                                }} />
                            <input
                                type="text"
                                value={email}
                                disabled
                                style={{
                                    fontSize: 16,
                                    color: '#888',
                                    border: '1.5px solid #f1f3f6',
                                    borderRadius: 8,
                                    padding: '6px 12px',
                                    width: '100%',
                                    marginBottom: 10,
                                    background: '#f7fafd'
                                }} />
                        </>
                    ) : (
                        <>
                            <div style={{ fontSize: 28, fontWeight: 700, color: '#1a237e', marginBottom: 6 }}>{user?.name}</div>
                            <div style={{ fontSize: 16, color: '#888', marginBottom: 10 }}>{user?.email}</div>
                        </>
                    )}
                    <div style={{ fontSize: 15, color: '#444', marginBottom: 0 }}>
                        {editing ? (
                            <textarea
                                value={newBio}
                                onChange={e => setNewBio(e.target.value)}
                                rows={2}
                                style={{
                                    fontSize: 15,
                                    border: '1.5px solid #cfd8dc',
                                    borderRadius: 8,
                                    padding: '6px 12px',
                                    width: '100%',
                                    marginTop: 4
                                }} />
                        ) : (
                            bio
                        )}
                    </div>
                </div>
                <div>
                    {!editing ? (
                        <button
                            onClick={handleEdit}
                            style={{
                                 background: "#0a3577",
                                color: '#fff',
                                border: 'none',
                                borderRadius: 8,
                                padding: '8px 24px',
                                fontWeight: 600,
                                fontSize: 16,
                                cursor: 'pointer'
                            }}
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <div style={{ display: 'flex', gap: 10 }}>
                            <button
                                onClick={handleCancel}
                                style={{
                                    background: '#fff',
                                    color: '#222',
                                    border: '1.5px solid #cfd8dc',
                                    borderRadius: 8,
                                    padding: '8px 18px',
                                    fontWeight: 600,
                                    fontSize: 16,
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                style={{
                                     background: "#0a3577",
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: 8,
                                    padding: '8px 18px',
                                    fontWeight: 600,
                                    fontSize: 16,
                                    cursor: 'pointer'
                                }}
                            >
                                Save changes
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Details Section */}
            <div style={{ padding: '32px 40px' }}>
                <div style={{ fontWeight: 700, fontSize: 18, color: '#1a237e', marginBottom: 18 }}>
                    News Preferences
                </div>
                <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 260 }}>
                        <div style={{ fontWeight: 600, color: '#222', marginBottom: 8 }}>Favorite Topics</div>
                        {editing ? (
                            <input
                                type="text"
                                value={newTopics}
                                onChange={e => setNewTopics(e.target.value)}
                                style={{
                                    fontSize: 15,
                                    border: '1.5px solid #cfd8dc',
                                    borderRadius: 8,
                                    padding: '6px 12px',
                                    width: '100%'
                                }}
                                placeholder="e.g. Tech, World, Business" />
                        ) : (
                            <div style={{ color: '#444', fontSize: 15 }}>
                                {topics.length ? topics.join(', ') : <span style={{ color: '#bbb' }}>No topics set</span>}
                            </div>
                        )}
                    </div>
                    <div style={{ flex: 1, minWidth: 260 }}>
                        <div style={{ fontWeight: 600, color: '#222', marginBottom: 8 }}>Favorite Sources</div>
                        {editing ? (
                            <input
                                type="text"
                                value={newSources}
                                onChange={e => setNewSources(e.target.value)}
                                style={{
                                    fontSize: 15,
                                    border: '1.5px solid #cfd8dc',
                                    borderRadius: 8,
                                    padding: '6px 12px',
                                    width: '100%'
                                }}
                                placeholder="e.g. BBC, CNN" />
                        ) : (
                            <div style={{ color: '#444', fontSize: 15 }}>
                                {sources.length ? sources.join(', ') : <span style={{ color: '#bbb' }}>No sources set</span>}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div><button style={{
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '8px 18px',
            fontWeight: 600,
            fontSize: 16,
            cursor: 'pointer',
            textAlign: 'center',
            position: 'fixed',
            right:'50%',
            boxShadow: '0 4px 12px rgba(30,105,222,0.2)',
            transition: 'background 0.3s ease',
            zIndex: 1000,
            background: "#0a3577"
        }} onClick={() => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            window.location.href = '/login';

        }}>Logout</button></>
    );
};

export default Profile;