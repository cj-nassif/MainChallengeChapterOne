import React, { useState, useRef, useEffect } from 'react';

import {
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
    TextInput
} from 'react-native';

import trashIcon from '../assets/icons/trash/trash.png';
import penIcon from '../assets/icons/pen/Pen.png';
import Icon from 'react-native-vector-icons/Feather';
import { EditTaskArgs } from '../pages/Home';




export interface Task {
    id: number;
    title: string;
    done: boolean;
}

export interface TasksItemProps {

    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: ({ taskId, taskNewTitle }: EditTaskArgs) => void;
}



export function TaskItem({ toggleTaskDone, removeTask, task, editTask }: TasksItemProps) {

    const [editing, setEditing] = useState(false)
    const [editedItem, setEditedItem] = useState(task.title)
    const textInputRef = useRef<TextInput>(null)

    function handleStartEditing() {

        setEditing(true)
    }

    function handleCancelEditing() {

        setEditedItem(task.title);


        setEditing(false);

    }

    function handleSubmitEditing() {

        editTask({ taskId: task.id, taskNewTitle: editedItem })
        setEditing(false)
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (editing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [editing])

    return (
        <>
            <View>
                <TouchableOpacity

                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(task.id)}
                //TODO - use onPress (toggle task) prop
                >
                    <View

                        style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                    //TODO - use style prop 
                    >
                        {task.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"

                            />
                        )}
                    </View>

                    <TextInput
                        value={editedItem}
                        onChangeText={setEditedItem}
                        ref={textInputRef}
                        style={task.done ? styles.taskTextDone : styles.taskText}
                        editable={editing}
                        onSubmitEditing={handleSubmitEditing}


                    //TODO - use style prop
                    />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', paddingHorizontal: 24 }}>
                <View style={{ paddingRight: 24 }}>
                    {editing ? (
                        <TouchableOpacity
                            onPress={handleCancelEditing}
                        >
                            <Icon
                                name="x"
                                size={22}
                                color="#c2c2c2"

                            />
                        </TouchableOpacity>) :
                        (<TouchableOpacity
                            onPress={handleStartEditing}
                            disabled={editing}
                        >
                            <Image source={penIcon} />
                        </TouchableOpacity>)
                    }
                </View>
                <View
                    style={styles.iconsDivider}
                />
                <View style={{ paddingLeft: 24 }}>
                    <TouchableOpacity
                        disabled={editing}
                        onPress={() => removeTask(task.id)}
                    >
                        <Image source={trashIcon} style={{ opacity: editing ? 0.2 : 1 }} />
                    </TouchableOpacity>
                </View>

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    iconsDivider: {
        width: 1,
        height: 24,
        backgroundColor: '#c4c4c424'
    }
})