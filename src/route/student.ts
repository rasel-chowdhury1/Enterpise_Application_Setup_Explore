import { Router } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export const router = Router();
const userRepository = AppDataSource.getRepository(User);

router
    .post('/user/create', async(req,res) => {
        console.log("body data =>>> ", req.body);
        const {firstName, lastName, age} = req.body;
        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.age = age;

        const result = await userRepository.save(user);

        res.status(201).json(result)
    })

    .patch('/user/update/:userId', async(req, res) => {
          try {
            const { userId } = req.params;
           const updateData = req.body;

            const user = await userRepository.findOneBy({ id: Number(userId) });
            if (!user) {
            return res.status(404).json({ message: "User not found" });
            }

            Object.assign(user, updateData);

            const updatedUser = await userRepository.save(user);

            return res.status(200).json({
            message: "User updated successfully",
            data: updatedUser,
            });
        } catch (error) {
            console.error("Error updating user:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    })

    .delete('/user/:userId', async (req,res) => {
        try {
            const { userId } = req.params;

            const user = await userRepository.findOneBy({ id: Number(userId) });
            if (!user) {
            return res.status(404).json({ message: "User not found" });
            }

            // Option 1: Hard delete
            await userRepository.remove(user);

            // Option 2: Soft delete (if you have `isDeleted` column)
            // user.isDeleted = true;
            // await userRepository.save(user);

            return res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            console.error("Error deleting user:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    })

    .get("/userList", async(req,res) => {

        const result = await userRepository.find();
        
        res.status(200).json(result);
    })

    .get('/user/:userId', async(req,res) => {
        console.log("req params data =>>> ", req.params)
        const {userId} = req.params;

        const result = await userRepository.findOneBy({id: Number(userId)})

        res.status(200).json(result);
    })

